import { Injectable } from '@nestjs/common';

@Injectable() //informa para o nest que essa classe vai ser usada no sistema de injecao de dependencias
export class ConceitosManualService {
  home(): string {
    return 'chamando get dos conceitos manuais [SERVICE]';
  }
}
