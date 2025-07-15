import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  //so vai pegar o id, dentros dos parametros
  findOne(@Param('id') id: string) {
    return [];
  }

  @Post('recados')
  create(@Body() body: any) {}
}
