import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove chaves que nao estao no dto
      forbidNonWhitelisted: true, //retorna erro quando a chave nao existir
      transform: false, //tenta transformar os tipos dos parametros e dtos. Causa um pequeno impacto de performance
    }),
    new ParseIntIdPipe(), //aplica a pipe de conversao de id em todos os parametros que forem IDs, de todas as rotas da aplicacao
  ); //validador TODO: estudar melhor o que essa classe faz e como funciona
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
