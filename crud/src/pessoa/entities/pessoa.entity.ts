import { IsEmail } from 'class-validator';
import { RecadoEntity } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pessoa')
export class PessoaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) //nao deixa que os valores sejam duplicados
  @IsEmail()
  email: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //uma pessoa pode ter enviado muitos recados, tendo seu ID atralado ao campo "FROM", la na entidade de recados
  @OneToMany(() => RecadoEntity, (recado) => recado.from)
  enviados: RecadoEntity[];

  //uma pessoa pode ter recebido varios recados, tendo seu id atrelado ao campo "FOR", da entidade de recados
  @OneToMany(() => RecadoEntity, (recado) => recado.for)
  recebidos: RecadoEntity[];
}
