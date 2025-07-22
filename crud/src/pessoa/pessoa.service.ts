import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaEntity } from './entities/pessoa.entity';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepository: Repository<PessoaEntity>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoaData = {
        name: createPessoaDto.name,
        email: createPessoaDto.email,
        passwordHash: createPessoaDto.password,
      };

      const pessoaDb = this.pessoaRepository.create(pessoaData);
      await this.pessoaRepository.save(pessoaDb);

      return pessoaDb;
    } catch (error) {
      if (error.code === '23505' /*criar enum pra isso*/) {
        throw new ConflictException('Email já cadastrado');
      }

      throw error;
    }
  }

  findAll() {
    return `This action returns all pessoa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
