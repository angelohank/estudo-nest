import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';
import { PessoaModule } from 'src/pessoa/pessoa.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([RecadoEntity]), //importa a entidade para ser usada nesse modulo
    PessoaModule, //importa o serviço PessoaService, usando forwardRef para evitar problemas de dependência ciclica
  ],
  controllers: [RecadosController],
  providers: [RecadosService],
})
export class RecadosModule {}
