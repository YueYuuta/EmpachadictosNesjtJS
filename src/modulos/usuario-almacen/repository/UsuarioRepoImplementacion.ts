import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/IUsuarioAlmacenCasoUso';
import { UsuarioAlmacenRepository } from './almacen.repository';
import { Brackets, Not } from 'typeorm';

import { EntityStatus } from '@utils/enums';
import { UsuarioAlmacen } from '../entidates/usuario-almacen.entity';
import { CrearUsuarioAlmacenDto, EditarUsuarioAlmacenDto } from '../api/dto';

@Injectable()
export class UsuarioAlmacenRepoService implements IUsuarioAlmacenCasoUso {
  constructor(
    private readonly _usuarioAlmacenRepository: UsuarioAlmacenRepository,
  ) {}
  async validarExisteEditar(
    UsuarioAlmacenID: number,
    UsuarioID: number,
    ALmacenID: number,
  ): Promise<UsuarioAlmacen> {
    try {
      return await this._usuarioAlmacenRepository.findOne({
        where: {
          Almacen: ALmacenID,
          Usuario: UsuarioID,
          Estado: EntityStatus.ACTIVE,
          UsuarioAlmacenID: Not(UsuarioAlmacenID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async validarExiste(
    UsuarioID: number,
    ALmacenID: number,
  ): Promise<UsuarioAlmacen> {
    try {
      return await this._usuarioAlmacenRepository.findOne({
        where: {
          Almacen: ALmacenID,
          Usuario: UsuarioID,
          Estado: EntityStatus.ACTIVE,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPorUsuario(UsuarioID: number): Promise<UsuarioAlmacen[]> {
    try {
      const usuariosAlmacen: UsuarioAlmacen[] = await this._usuarioAlmacenRepository.find(
        {
          where: { Usuario: UsuarioID, Estado: EntityStatus.ACTIVE },
        },
      );

      return usuariosAlmacen;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPorAlmacen(AlmacenID: number): Promise<UsuarioAlmacen[]> {
    try {
      const usuariosAlmacen: UsuarioAlmacen[] = await this._usuarioAlmacenRepository.find(
        {
          where: { Almacen: AlmacenID, Estado: EntityStatus.ACTIVE },
        },
      );

      return usuariosAlmacen;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async eliminar(UsuarioAlmacenID: any): Promise<boolean> {
    try {
      await this._usuarioAlmacenRepository.update(UsuarioAlmacenID, {
        Estado: EntityStatus.INACTIVE,
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPorBusqueda(termino: string): Promise<any> {
    try {
      return await this._usuarioAlmacenRepository
        .createQueryBuilder('UsuarioAlmacen')
        .innerJoinAndSelect('UsuarioAlmacen.Almacen', 'Almacen')
        .innerJoinAndSelect('UsuarioAlmacen.Usuario', 'Usuario')
        .innerJoinAndSelect('Usuario.Detalle', 'Detalle')
        .where('UsuarioAlmacen.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
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
              .orWhere('Almacen.NombreComercial ILIKE :NombreComercial', {
                NombreComercial: `%${termino}%`,
              })
              .orWhere('Almacen.RazonSocial ILIKE :RazonSocial', {
                RazonSocial: `%${termino}%`,
              })
              .orWhere(
                "Detalle.Nombres || ' ' || Detalle.Apellidos ILIKE :Full",
                {
                  Full: `%${termino}%`,
                },
              );
          }),
        )
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtener(): Promise<UsuarioAlmacen[]> {
    try {
      return await this._usuarioAlmacenRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
        order: {
          UsuarioAlmacenID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._usuarioAlmacenRepository.findAndCount({
        where: { status: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          UsuarioAlmacenID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(UsuarioAlmacenID: number): Promise<UsuarioAlmacen> {
    try {
      const uAlmacen: UsuarioAlmacen = await this._usuarioAlmacenRepository.findOne(
        UsuarioAlmacenID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!uAlmacen) {
        throw new NotFoundException(
          `el almacen con id: ${UsuarioAlmacenID} no existe`,
        );
      }
      return uAlmacen;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(
    usuarioAlmacen: Partial<EditarUsuarioAlmacenDto>,
    UsuarioAlmacenID: number,
  ): Promise<any> {
    try {
      return await this._usuarioAlmacenRepository.update(
        UsuarioAlmacenID,
        usuarioAlmacen,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(almacen: CrearUsuarioAlmacenDto): Promise<UsuarioAlmacen> {
    try {
      const uAlmacenIntance = new UsuarioAlmacen();
      Object.assign(uAlmacenIntance, almacen);
      return await uAlmacenIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
