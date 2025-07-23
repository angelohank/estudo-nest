import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  @IsString() //fazendo com que o nest verifique o tipo de dado que esta chegando aqui. Retorna bad request
  @IsNotEmpty() //o texto nao pode vir vazio
  @MinLength(5) //definindo o tamanho minimo do campo
  @MaxLength(255) //definindo tamanho maximo do campo
  readonly texto: string;

  @IsPositive()
  fromId: number;

  @IsPositive()
  forId: number;
  // @IsString({ message: 'esse valor deve ser uma string' })
  // @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(50)
  // @IsOptional() //defindindo campo como opcional
  // readonly from: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(50)
  // readonly for: string;
}
