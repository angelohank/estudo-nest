import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaModule } from './pessoa/pessoa.module';

@Module({
  imports: [
    RecadosModule,
    //TODO usar o configModule
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'estudos-nest',
      autoLoadEntities: true, //carrega entidades sem precisar especificar
      synchronize: true, //sincroniza o banco de dados com as entidades. NAO DEVE SER USADO EM PRODUCAO
    }),
    PessoaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
