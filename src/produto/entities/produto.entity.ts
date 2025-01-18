import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { NumericTransformer } from '../../util/numerictransformer';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  desenvolvera: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  plataforma: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  preco: number;

  @Column({ type: 'date' })
  data_lancamento: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
