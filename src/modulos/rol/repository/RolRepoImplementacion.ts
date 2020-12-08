import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IRolCasoUso } from '../role-caso-uso/IRolCasoUso';
import { RolModel } from '../role-caso-uso/models/rol';
import { Rol } from '../entidades/rol.entity';
import { RolRepository } from './role.repository';
import { Permiso } from '../entidades/permiso.entity';
import { PermisoRepository } from './permiso.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from '@utils/enums';
import { Brackets, Not } from 'typeorm';
import { RolPermisoRepository } from './rol-permiso.repository';
import { RolPermiso } from '../entidades/rol-permiso.entity';

@Injectable()
export class RolRepoService implements IRolCasoUso {
  constructor(
    @InjectRepository(RolRepository)
    private readonly _rolRepository: RolRepository,
    @InjectRepository(PermisoRepository)
    private readonly _permisoRepository: PermisoRepository,
    @InjectRepository(RolPermisoRepository)
    private readonly _rolPermisoRepository: RolPermisoRepository,
  ) {}
  obtenerRoles(): Promise<Rol[]> {
    try {
      return this._rolRepository
        .createQueryBuilder('Rol')
        .innerJoinAndSelect('Rol.RolPermiso', 'RolPermiso')
        .innerJoinAndSelect('RolPermiso.Permiso', 'Permiso')
        .innerJoinAndSelect('Permiso.Modulo', 'Modulo')
        .where('Rol.Estado =:Estado', { Estado: EntityStatus.ACTIVE })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return this._rolRepository
        .createQueryBuilder('Rol')

        .where('Rol.Estado =:Estado', { Estado: EntityStatus.ACTIVE })
        .skip(desde)
        .take(limite)
        .getManyAndCount();
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
    return await this._rolRepository
      .createQueryBuilder('Rol')
      .where('Rol.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
      .andWhere(
        new Brackets(qb => {
          qb.where('Rol.Nombre ILIKE :Nombre', {
            Nombre: `%${termino}%`,
          });
        }),
      )
      .skip(desde)
      .take(limite)
      .orderBy('Rol.RolID', 'DESC')
      .getManyAndCount();
  }
  obtenerPermisos(): Promise<Permiso[]> {
    try {
      return this._permisoRepository
        .createQueryBuilder('Permiso')
        .innerJoinAndSelect('Permiso.Modulo', 'Modulo')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPermisosPorRole(RolID: number): Promise<RolPermiso[]> {
    try {
      return await this._rolPermisoRepository
        .createQueryBuilder('RolPermiso')
        .innerJoin('RolPermiso.Rol', 'Rol')
        .innerJoinAndSelect('RolPermiso.Permiso', 'Permiso')
        .innerJoinAndSelect('Permiso.Modulo', 'Modulo')
        .where('RolPermiso.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere('Rol.RolID=:RolID', { RolID })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(RolID: number): Promise<boolean> {
    try {
      await this._rolRepository.update(RolID, {
        Estado: EntityStatus.INACTIVE,
      });
      await this.cambiarEstado(EntityStatus.INACTIVE, RolID);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async cambiarEstado(estado: boolean, RolID: number): Promise<void> {
    try {
      await this._rolPermisoRepository
        .createQueryBuilder('RolPermiso')
        .update('RolPermiso')
        .set({ Estado: estado })
        .where('RolID = :id', { id: RolID })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async editar(RolID: number, rol: RolModel): Promise<boolean> {
    try {
      await this.cambiarEstado(EntityStatus.INACTIVE, RolID);
      const rolInstance = await this.obtenerPodId(RolID);
      this._rolRepository.merge(rolInstance, rol);
      await this._rolRepository.save(rolInstance);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async nombreRolExisteEditar(RolID: number, nombre: string): Promise<Rol> {
    try {
      return await this._rolRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Nombre: nombre,
          RolID: Not(RolID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPodId(RolID: number): Promise<Rol> {
    try {
      const rol: Rol = await this._rolRepository.findOne(RolID, {
        where: { Estado: EntityStatus.ACTIVE },
      });

      if (!rol) {
        throw new NotFoundException(`El rol con id: ${RolID} no existe`);
      }
      return rol;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async nombreRolExiste(nombre: string): Promise<Rol> {
    try {
      return await this._rolRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Nombre: nombre },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPermisoPorId(PermisoID: number): Promise<Permiso> {
    try {
      const permiso: Permiso = await this._permisoRepository.findOne(PermisoID);

      if (!permiso) {
        throw new NotFoundException(
          `el permiso con id: ${PermisoID} no existe`,
        );
      }
      return permiso;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(rol: RolModel): Promise<Rol> {
    try {
      const rolInstance = new Rol();
      Object.assign(rolInstance, rol);
      return await rolInstance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
