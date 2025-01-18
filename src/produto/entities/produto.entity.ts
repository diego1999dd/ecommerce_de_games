import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

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

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ type: 'date' })
  data_lancamento: Date;
}
