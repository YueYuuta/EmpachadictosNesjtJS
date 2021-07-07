import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Not, Raw } from 'typeorm';
import { CambiarMesaDto } from '../api/dto/cambiar-mesa.dto';
import { Mesa } from '../entidades/mesa.entity';
import { IMesaCasoUso } from '../mesa-caso-uso/IMesaCasoUso';
import { MesaModel } from '../mesa-caso-uso/models/mesa';
import { MesaRepository } from './mesa.repository';

@Injectable()
export class MesaRepoService implements IMesaCasoUso {
  constructor(private readonly _planRepository: MesaRepository) {}
  async ocuparMesa(
    ocuparMesa: CambiarMesaDto,
    MesaID: number,
  ): Promise<boolean> {
    try {
      await this._planRepository.update(MesaID, ocuparMesa);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtener(AlmacenID: number): Promise<Mesa[]> {
    try {
      return await this._planRepository.find({
        where: { Estado: EntityStatus.ACTIVE, AlmacenID },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarNombre(descripcion: string, AlmacenID: number): Promise<Mesa> {
    try {
      return await this._planRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          AlmacenID,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async verificarNombreEditar(
    descripcion: string,
    MesaID: number,
    AlmacenID: number,
  ): Promise<Mesa> {
    try {
      return await this._planRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          MesaID: Not(MesaID),
          AlmacenID,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(MesaID: any): Promise<boolean> {
    try {
      await this._planRepository.update(MesaID, {
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
    AlmacenID: number,
  ): Promise<any> {
    try {
      return await this._planRepository.findAndCount({
        where: [
          {
            Estado: EntityStatus.ACTIVE,
            Nombre: Raw(alias => `${alias} ILIKE '%${termino}%'`),
            AlmacenID,
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

  async obtenerPaginado(
    desde: number,
    limite: number,
    AlmacenID: number,
  ): Promise<any> {
    try {
      return await this._planRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE, AlmacenID },
        skip: desde,
        take: limite,
        order: {
          MesaID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(MesaID: number): Promise<Mesa> {
    try {
      const plan: Mesa = await this._planRepository.findOne(MesaID, {
        where: { Estado: EntityStatus.ACTIVE },
      });

      if (!plan) {
        throw new NotFoundException(`el plan con id: ${MesaID} no existe`);
      }
      return plan;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(plan: MesaModel, MesaID: number): Promise<boolean> {
    try {
      await this._planRepository.update(MesaID, plan);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(plan: MesaModel): Promise<Mesa> {
    console.log(plan);
    try {
      const planIntance = new Mesa();
      Object.assign(planIntance, plan);
      return await planIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
