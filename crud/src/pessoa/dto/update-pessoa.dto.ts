import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {
  @IsString()
  @IsOptional()
  @MinLength(5)
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
