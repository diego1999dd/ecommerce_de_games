import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ProdutoService } from '../../produto/services/produto.service';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    //private produtoService: ProdutoService,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const Categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: {
        produto: true,
      },
    });

    if (!Categoria)
      throw new HttpException(
        'Categoria não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    return Categoria;
  }

  async findByCategoria(nome: string): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        produto: true,
      },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    //await this.produtoService.findById(categoria.produto.id);

    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.categoriaRepository.delete(id);
  }
}
