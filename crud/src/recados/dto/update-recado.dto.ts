import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDto } from './create-recado.dto';
import { IsBoolean, IsOptional } from 'class-validator';

//partialTypes eh uma biblioteca do nest à parte, permite extender objetos, evitando duplicacao de validacoes
export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  @IsBoolean()
  @IsOptional()
  read?: boolean;
}
