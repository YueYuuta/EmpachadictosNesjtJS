import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from '../entidates/usuario.entity';
import { IUsuarioCasoUso } from '../usuario-caso-uso/IUsuarioCasoUso';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioModel } from '../usuario-caso-uso/models/usuario';
import { Brackets, Not } from 'typeorm';
import { EntityStatus } from '@utils/enums/entity-status.enum';
import { UsuarioDetalleRepository } from './usuario-detalle.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioRepoService implements IUsuarioCasoUso {
  constructor(
    @InjectRepository(UsuarioRepository)
    private readonly _usuarioRepository: UsuarioRepository,
    @InjectRepository(UsuarioDetalleRepository)
    private readonly _usuarioDetalleRepository: UsuarioDetalleRepository,
  ) {}
  async autoEliminar(
    UsuarioID: number,
    UsuarioLoginID: number,
  ): Promise<Usuario> {
    try {
      const userExist = await this._usuarioRepository.findOne(UsuarioID, {
        where: { Estado: EntityStatus.ACTIVE, UsuarioID: Not(UsuarioLoginID) },
      });
      return userExist;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async eliminar(UsuarioID: number): Promise<boolean> {
    try {
      await this._usuarioRepository.update(UsuarioID, {
        Estado: EntityStatus.INACTIVE,
      });
      await this._usuarioDetalleRepository
        .createQueryBuilder('UsuarioDetalle')
        .update('UsuarioDetalle')
        .set({ Estado: EntityStatus.INACTIVE })
        .where('UsuarioID = :id', { id: UsuarioID })
        .execute();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any> {
    try {
      return await this._usuarioRepository
        .createQueryBuilder('Usuario')
        .innerJoinAndSelect('Usuario.Detalle', 'Detalle')
        .innerJoinAndSelect('Usuario.Rol', 'Rol')
        .where('Usuario.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere(
          new Brackets(qb => {
            qb.where('Usuario.Usuario ILIKE :Usuario', {
              Usuario: `%${termino}%`,
            })
              .orWhere('Detalle.Nombres ILIKE :Nombres', {
                Nombres: `%${termino}%`,
              })
              .orWhere('Detalle.Apellidos ILIKE :Apellidos', {
                Apellidos: `%${termino}%`,
              })
              .orWhere(
                "Detalle.Nombres || ' ' || Detalle.Apellidos ILIKE :Full",
                {
                  Full: `%${termino}%`,
                },
              );
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Usuario.UsuarioID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtener(): Promise<Usuario[]> {
    try {
      const usuarios = await this._usuarioRepository.find({
        where: {
          Estado: EntityStatus.ACTIVE,
        },
        order: {
          UsuarioID: 'DESC',
        },
      });
      return usuarios;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      const usuarios = await this._usuarioRepository.findAndCount({
        where: {
          Estado: EntityStatus.ACTIVE,
        },
        skip: desde,
        take: limite,
        order: {
          UsuarioID: 'DESC',
        },
      });
      return usuarios;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async existeUsuarioCorreoEditar(
    Correo: string,
    UsuarioID: number,
  ): Promise<Usuario> {
    try {
      return await this._usuarioRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Correo,
          UsuarioID: Not(UsuarioID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async existeUsuarioEditar(
    Usuario: string,
    UsuarioID: number,
  ): Promise<Usuario> {
    try {
      return await this._usuarioRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Usuario,
          UsuarioID: Not(UsuarioID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(UsuarioID: number): Promise<Usuario> {
    try {
      const usuario: Usuario = await this._usuarioRepository.findOne(UsuarioID);
      if (!usuario) {
        throw new NotFoundException(
          `El usuario no existe en la base de datos!`,
        );
      }
      return usuario;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerUsuarios(): Promise<Usuario[]> {
    try {
      return await this._usuarioRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async existeUsuarioCorreo(Correo: string): Promise<Usuario> {
    try {
      return await this._usuarioRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Correo },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async existeUsuario(Usuario: string): Promise<Usuario> {
    try {
      return await this._usuarioRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Usuario },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async editar(
    usuario: Partial<UsuarioModel>,
    UsuarioID: number,
  ): Promise<any> {
    // console.log(usuario);
    try {
      const usuarioIntance = await this.obtenerPodId(UsuarioID);
      this._usuarioRepository.merge(usuarioIntance, usuario);
      usuarioIntance.Rol = usuario.Rol;

      return await this._usuarioRepository.save(usuarioIntance);
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(usuario: UsuarioModel): Promise<Usuario> {
    try {
      const usuarioIntance = new Usuario();
      Object.assign(usuarioIntance, usuario);
      console.log(usuarioIntance, '♀♀♀');
      return await usuarioIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
