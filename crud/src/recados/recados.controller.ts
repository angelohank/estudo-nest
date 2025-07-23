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
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

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
//@UseInterceptors(AddHeaderInterceptor) //utiliza o interceptor em todas as rotas desse controller
@UsePipes(ParseIntIdPipe) //aplica a pipe de conversao de id em todas as rotas desse controller
export class RecadosController {
  constructor(private readonly service: RecadosService) {}

  //@HttpCode(201) -> decorator que permite personalizar o retorno padrao da rota
  //@HttpCode(HttpStatus.CREATED) mesmo principio, mas utilizando as contantes do nest
  @Get()
  @UseInterceptors(AddHeaderInterceptor)
  //query params -> vai imprimir todos os parametros passados depois do ? da url
  findAll(@Query() paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return this.service.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post('create')
  //@Body(chave) -> pega apenas a chave desejada dentro do body
  create(@Body() dto: CreateRecadoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateRecadoDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id') //tudo que vier da url vai ser, necessariamente, uma string
  remove(@Param('id', ParseIntPipe) id: number) {
    //ao inves de passar o pipe la na main, pode-se passar em cada parametro. Nesse caso, esta tentando converter o int
    //melhor usar assim pois converte apenas o que quiser, e nao tudo da aplicacao

    this.service.remove(id);
  }
}
