import { Injectable } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>, //injetando o repositório da entidade RecadoEntity
  ) {}

  async findAll() {
    //se nao for necessario manipular os dados, podemos retornar a promisse diretamente, o nest resolve ela sozinho
    return this.recadoRepository.find(); //metodo do typeorm que busca todos os registros da tabela
  }

  async findOne(id: string) {
    const recado = await this.recadoRepository.findOneBy({ id: +id });

    if (recado) return recado;

    throw new NotFoundError('Objeto nao encontrado');
  }

  async create(createDto: CreateRecadoDto) {
    const novoRecado = {
      ...createDto,
      read: false,
      dtCriacao: new Date(), //tem que criar esses dados "na mao" pois nao existem no dto
    };

    const recado = await this.recadoRepository.create(novoRecado); //metodo do typeorm que cria o registro na tabela. Cria o valor do createdAt aqui
    return this.recadoRepository.save(recado); //metodo do typeorm que salva o registro na tabela
  }

  async update(id: number, dto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      read: dto?.read,
      texto: dto?.texto,
    };

    //preload recebe o argumento para encontrar o objeto, e os valores a serem atualizados
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });

    if (!recado) throw new NotFoundError('Objeto nao encontrado');

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
