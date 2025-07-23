import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll() {
    const pessoas = await this.pessoaRepository.find({
      order: {
        id: 'ASC',
      },
    });

    return pessoas;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const partialPessoa = {
      passwordHash: updatePessoaDto?.password,
      name: updatePessoaDto?.name,
    };

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...partialPessoa,
    });

    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');

    return this.pessoaRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });

    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');

    return this.pessoaRepository.delete(id);
  }
}
