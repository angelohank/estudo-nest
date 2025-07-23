import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/*
os pipes sao executados antes do metodo que o usa, ou entao do controller que o usa
Eles servem para transformar, validar ou manipular os dados que chegam na requisição
*/

@Injectable()
//o objetivo dessa pipe eh validar todos os parametros que forem IDs
export class ParseIntIdPipe implements PipeTransform {
  //metadata sao informacos sobre como o valor chega aqui
  transform(value: any, metadata: ArgumentMetadata) {
    /*metadata tem:
        tipo do dado que esta sendo passado
        tipo do parametro - de onde ele esta vindo - (query, body, param, etc)
        data, que eh o nome do parametro
    */

    //fazendo essa validacao, podemos usar isso em um controller inteiro, por exemplo
    //pois ele só vai ter efeito sobre o que vier no params da request e se chamar ID
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    //fazer o parse
    const parsedValue = Number(value);

    //verificar se o valor transformado eh valido
    if (isNaN(parsedValue)) {
      throw new BadRequestException(`Param ID is not a string: ${value}`);
    }

    if (parsedValue <= 0) {
      throw new BadRequestException(
        `Param ID must be a positive integer: ${value}`,
      );
    }

    return parsedValue;
  }
}
