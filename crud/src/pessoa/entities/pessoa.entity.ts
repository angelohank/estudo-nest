import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}
