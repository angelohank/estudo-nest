//isso aqui vai representar um recado
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('recado') //isso aqui vai criar uma tabela com o nome que estiver definido na classe (ou no que estiver no decorator)
export class RecadoEntity {
  @PrimaryGeneratedColumn() //vai criar uma coluna que vai ser a chave primaria e vai ser auto incrementada
  id: number;

  @Column({ type: 'varchar', length: 255 }) //sem nada, ela fica com o tipo de texto
  texto: string;
  @Column({ type: 'varchar', length: 50 })
  from: string;
  @Column({ type: 'varchar', length: 50 })
  for: string;

  @Column({ default: false })
  read: boolean; //nao

  @Column()
  dtCriacao: Date; //nao

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
