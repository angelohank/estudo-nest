import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  home(): string {
    return 'chamando get dos conceitos AUTOMATICOS [SERVICE]';
  }
}
