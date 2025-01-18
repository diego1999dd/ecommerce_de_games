import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { ProdutoModule } from '../produto/produto.module';
import { CategoriaController } from './controllers/categoria.controller';
import { CategoriaService } from './services/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [TypeOrmModule, CategoriaService],
})
export class CategoriaModule {}
