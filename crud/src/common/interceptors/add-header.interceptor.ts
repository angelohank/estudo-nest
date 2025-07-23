import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements NestInterceptor {
  /**
   *
   * @param context informacoes sobre o contexto onde a requisicao esta sendo executada. Tipo (http, websocket, etc), controller, request, response
   * @param next eh o que define se pode ir pra frente ou nao, como se fosse o middleware do express
   */

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //pegando o response do contexto
    const response = context.switchToHttp().getResponse();

    //adicionando um header personalizado na resposta
    response.setHeader('X-Custom-Header', 'meuHeaderPersnalizado');

    //isso aqui estao falando que os dados podem ir adiante
    return next.handle();
  }
}
