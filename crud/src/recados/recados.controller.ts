import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

/*
CRUD
Create -> POST: cria um recado
Read   -> GET: le um recados, ou todos os recados
Update -> PATCH / PUT: atualizar um recado
Delete -> DELETE: apagar um recado

PATCH: utilizado para atualizar dados de um recurso (trocar só uma chave, por exemplo)
PUT: utilizado para atualizar um recurso inteiro
*/

/*
DTO - Data Transfer Object -> Objeto de Transferencia de dados
Objeto Simples de transporte de dados (Martin Fowler)

Usado pra validar, ou transformar dados -> padrao NEST
*/

@Controller('recados')
export class RecadosController {
  constructor(private readonly service: RecadosService) {}

  //@HttpCode(201) -> decorator que permite personalizar o retorno padrao da rota
  //@HttpCode(HttpStatus.CREATED) mesmo principio, mas utilizando as contantes do nest
  @Get()
  //query params -> vai imprimir todos os parametros passados depois do ? da url
  findAll(@Query() paginacao: any) {
    return this.service.findAll();
  }

  @Get(':id')
  //so vai pegar o id, dentros dos parametros
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post('create')
  //@Body(chave) -> pega apenas a chave desejada dentro do body
  create(@Body() dto: CreateRecadoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRecadoDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id') //tudo que vier da url vai ser, necessariamente, uma string
  remove(@Param('id', ParseIntPipe) id: number) {
    //ao inves de passar o pipe la na main, pode-se passar em cada parametro. Nesse caso, esta tentando converter o int
    //melhor usar assim pois converte apenas o que quiser, e nao tudo da aplicacao

    this.service.remove(id);
  }
}
