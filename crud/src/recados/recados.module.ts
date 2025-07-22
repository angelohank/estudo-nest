import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([RecadoEntity]), //importa a entidade para ser usada nesse modulo
  ],
  controllers: [RecadosController],
  providers: [RecadosService],
})
export class RecadosModule {}
