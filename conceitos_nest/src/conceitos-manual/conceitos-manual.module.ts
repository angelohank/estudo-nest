import { Module } from '@nestjs/common';
import { ConceitosManualController } from './conceitos-manual.controller';
import { ConceitosManualService } from './conceitos-manual.service';

//decorator
//muda o comportamento da classe
//essa anotation serve pra dizer que é um modulo
@Module({
  controllers: [ConceitosManualController],
  providers: [ConceitosManualService],
})
export class ConceitosManualModule {}
