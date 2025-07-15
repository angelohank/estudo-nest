import { Controller, Get } from '@nestjs/common';
import { ConceitosManualService } from './conceitos-manual.service';

@Controller('conceitos-manual')
export class ConceitosManualController {
  constructor(private readonly service: ConceitosManualService) {}

  @Get()
  conceitos(): string {
    return this.service.home();
  }
}
