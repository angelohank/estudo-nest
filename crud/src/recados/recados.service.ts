import { Injectable } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { from, NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { text } from 'stream/consumers';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>, //injetando o repositório da entidade RecadoEntity
    private readonly pessoaService: PessoaService,
  ) {}

  async findAll() {
    //se nao for necessario manipular os dados, podemos retornar a promisse diretamente, o nest resolve ela sozinho
    //metodo do typeorm que busca todos os registros da tabela
    return this.recadoRepository.find({
      relations: ['from', 'for'], //carrega as relações de from e for
      order: {
        id: 'desc',
      },
      select: {
        from: { id: true, name: true }, //seleciona apenas o id e nome da pessoa que enviou o recado
        for: { id: true, name: true }, //seleciona apenas o id e nome da pessoa que recebeu o recado
      },
    });
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
      relations: ['from', 'for'], //carrega as relações de from e for
      select: {
        from: { id: true, name: true }, //seleciona apenas o id e nome da pessoa que enviou o recado
        for: { id: true, name: true }, //seleciona apenas o id e nome da pessoa que recebeu o recado
      },
    });

    if (recado) return recado;

    throw new NotFoundError('Objeto nao encontrado');
  }

  async create(createDto: CreateRecadoDto) {
    const { fromId, forId } = createDto;
    //encontrar a pessoa que esta criando o recados
    const pessoaFrom = await this.pessoaService.findOne(fromId);

    //encontrar destinatario do recado
    const pessoaFor = await this.pessoaService.findOne(forId);

    if (!pessoaFrom || !pessoaFor) {
      throw new NotFoundError(
        'Pessoa remetente ou destinatário não encontrada',
      );
    }

    const novoRecado = {
      texto: createDto.texto,
      from: pessoaFrom,
      for: pessoaFor,
      read: false,
      dtCriacao: new Date(), //tem que criar esses dados "na mao" pois nao existem no dto
    };

    const recado = this.recadoRepository.create(novoRecado); //metodo do typeorm que cria o registro na tabela. Cria o valor do createdAt aqui
    await this.recadoRepository.save(recado); //metodo do typeorm que salva o registro na tabela

    return {
      ...recado,
      from: {
        id: recado.from.id,
      },
      for: {
        id: recado.for.id,
      },
    };
  }

  async update(id: number, dto: UpdateRecadoDto) {
    const recado = await this.findOne(id);

    //quero atualizar ou o texto, ou o read
    /*nao faz sentido atualizar um recado que ja foi lido, trabalhar nisso no futuro */
    recado.texto = dto?.texto ?? recado.texto;
    recado.read = dto?.read ?? recado.read;

    await this.recadoRepository.save(recado); //metodo do typeorm que salva o registro atualizado na tabela
    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });
    if (!recado) {
      throw new NotFoundError('Objeto nao encontrado');
    }

    this.recadoRepository.remove(recado); //metodo do typeorm que remove o registro da tabela
    return { message: 'Recado deletado com sucesso' };
  }
}
