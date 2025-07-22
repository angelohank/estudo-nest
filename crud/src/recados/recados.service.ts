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

  private lastId = 1;
  private recados: RecadoEntity[] = [
    {
      id: 1,
      texto: 'Meu primeiro recado',
      from: 'Angelo',
      for: 'Fernanda',
      read: false,
      dtCriacao: new Date(),
    },
  ];

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

  update(id: string, dto: UpdateRecadoDto) {
    const recadoExiste = this.recados.findIndex((item) => item.id === +id); //encontrando item com o id passado

    if (recadoExiste < 0) {
      throw new NotFoundError('Objeto nao encontrado');
    }

    const recado = this.recados[recadoExiste];
    this.recados[recadoExiste] = {
      ...recado,
      ...dto, //aqui nao precisa definir na mao pois os dados estao marcados como opcionais no dto
    };
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
