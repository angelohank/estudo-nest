import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosManualModule } from './conceitos-manual/conceitos-manual.module';
import { ConceitosAutomaticoModule } from './conceitos-automatico/conceitos-automatico.module';

@Module({
  imports: [ConceitosManualModule, ConceitosAutomaticoModule],
  controllers: [AppController], //controladores de rotas
  providers: [AppService], //usado para injetar dependencias
})
export class AppModule {}
