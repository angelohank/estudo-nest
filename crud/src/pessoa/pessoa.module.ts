import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaEntity } from './entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaEntity])],
  controllers: [PessoaController],
  providers: [PessoaService], //para uso interno do modulo
  exports: [PessoaService], //para uso externo do modulo
})
export class PessoaModule {}
