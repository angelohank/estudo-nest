//isso aqui vai representar um recado
import { PessoaEntity } from 'src/pessoa/entities/pessoa.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('recado') //isso aqui vai criar uma tabela com o nome que estiver definido na classe (ou no que estiver no decorator)
export class RecadoEntity {
  @PrimaryGeneratedColumn() //vai criar uma coluna que vai ser a chave primaria e vai ser auto incrementada
  id: number;

  @Column({ type: 'varchar', length: 255 }) //sem nada, ela fica com o tipo de texto
  texto: string;

  /*muito recados podem ser enviados por uma unica pessoa*/
  @ManyToOne(() => PessoaEntity) //DER -> uma pessoa pode mandar varios recados
  //especifica a coluna "for", que armazena o id da pessoa que enviou o recado
  @JoinColumn({ name: 'from' })
  from: PessoaEntity;

  /*muito recados podem ser enviados para uma unica pessoa*/
  @ManyToOne(() => PessoaEntity)
  //especifica a coluna "from", que armazena o id da pessoa que recebeu o recado
  @JoinColumn({ name: 'for' })
  for: PessoaEntity;

  @Column({ default: false })
  read: boolean; //nao

  @Column()
  dtCriacao: Date; //nao

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
