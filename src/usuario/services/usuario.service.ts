import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: {
        produto: true,
      },
    });

    if (!usuario)
      throw new HttpException(
        'Usuário não encontrado(a)!',
        HttpStatus.NOT_FOUND,
      );

    return usuario;
  }

  // Método auxiliar para validacao do Usuario
  async findByUsuario(usuario: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario)
      throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);

    usuario.data_nascimento = new Date(usuario.data_nascimento);

    const dataAtual = new Date();
    const idade =
      dataAtual.getFullYear() - usuario.data_nascimento.getFullYear();

    const mes = dataAtual.getMonth() - usuario.data_nascimento.getMonth();

    if (
      (mes < 0 ||
        (mes === 0 &&
          dataAtual.getDate() <= usuario.data_nascimento.getDate())) &&
      idade < 18
    )
      throw new HttpException(
        'O Usuário precisa ser maior que 18 anos!',
        HttpStatus.FORBIDDEN,
      );

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    // vem todos os dados do usuario,
    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'O Usuário (e-mail) já cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return await this.usuarioRepository.save(usuario);
  }
}
