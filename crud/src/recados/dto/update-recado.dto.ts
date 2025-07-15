import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDto } from './create-recado.dto';

//partialTypes eh uma biblioteca do nest à parte, permite extender objetos, evitando duplicacao de validacoes
export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  // ? indica que a chave eh opcional
  // texto?: string
}
