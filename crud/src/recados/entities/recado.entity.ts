//isso aqui vai representar um recado

export class RecadoEntity {
  id: number;
  texto: string;
  from: string;
  for: string;
  read: boolean;
  dtCriacao: Date;
}
