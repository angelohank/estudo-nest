import { Injectable } from '@nestjs/common';
import { RecadoEntity } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { read } from 'fs';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class RecadosService {
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

  //metodo que retorna todos os recados da lista
  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    //retornando o item que tiver como id o valor passado por parametro
    return this.recados.find((item) => item.id == +id);
  }

  create(createDto: CreateRecadoDto) {
    this.lastId++; //atualiza o id
    const id = this.lastId;

    const novoRecado = {
      id,
      ...createDto,
      read: false,
      dtCriacao: new Date(), //tem que criar esses dados "na mao" pois nao existem no dto
    };

    this.recados.push(novoRecado); //adiciona o novo recado no array
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

  remove(id: number) {
    const recadoExistente = this.recados.findIndex((item) => item.id === id); //encontrando item com o id passado
    if (recadoExistente >= 0) {
      this.recados.splice(recadoExistente); //removendo o item que for encontrado
    } else {
      return 'nao foi encontrado nenhum registro';
    }
  }
}
