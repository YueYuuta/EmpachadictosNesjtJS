import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Not, Raw } from 'typeorm';
import { ICategoriaCasoUso } from '../categoria-caso-uso/ICategoriaCasoUso';
import { CategoriaModel } from '../categoria-caso-uso/models/categoria';
import { Categoria } from '../entidades/categoria.entity';
import { CategoriaRepository } from './categoria.repository';

@Injectable()
export class CategoriaRepoService implements ICategoriaCasoUso {
  constructor(private readonly _categoriaRepository: CategoriaRepository) {}

  async obtener(): Promise<Categoria[]> {
    try {
      return await this._categoriaRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarNombre(nombre: string): Promise<Categoria> {
    try {
      return await this._categoriaRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Nombre: nombre },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async verificarNombreEditar(
    nombre: string,
    CategoriaID: number,
  ): Promise<Categoria> {
    try {
      return await this._categoriaRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Nombre: nombre,
          CategoriaID: Not(CategoriaID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(CategoriaID: any): Promise<boolean> {
    try {
      await this._categoriaRepository.update(CategoriaID, {
        Estado: EntityStatus.INACTIVE,
      });
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
      return await this._categoriaRepository.findAndCount({
        where: [
          {
            Estado: EntityStatus.ACTIVE,
            Nombre: Raw(alias => `${alias} ILIKE '%${termino}%'`),
          },
        ],
        skip: desde,
        take: limite,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._categoriaRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          CategoriaID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(CategoriaID: number): Promise<Categoria> {
    try {
      const categoria: Categoria = await this._categoriaRepository.findOne(
        CategoriaID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!categoria) {
        throw new NotFoundException(
          `el categoria con id: ${CategoriaID} no existe`,
        );
      }
      return categoria;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(
    categoria: CategoriaModel,
    CategoriaID: number,
  ): Promise<boolean> {
    try {
      await this._categoriaRepository.update(CategoriaID, categoria);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(categoria: CategoriaModel): Promise<Categoria> {
    console.log(categoria);
    try {
      const categoriaIntance = new Categoria();
      Object.assign(categoriaIntance, categoria);
      return await categoriaIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
