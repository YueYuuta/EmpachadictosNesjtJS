import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Not, Raw } from 'typeorm';
import { Plan } from '../entidades/plan.entity';
import { IPlanCasoUso } from '../plan-caso-uso/IPlanCasoUso';
import { PlanModel } from '../plan-caso-uso/models/plan';
import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanRepoService implements IPlanCasoUso {
  constructor(private readonly _planRepository: PlanRepository) {}

  async obtener(): Promise<Plan[]> {
    try {
      return await this._planRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarNombre(descripcion: string): Promise<Plan> {
    try {
      return await this._planRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Descripcion: descripcion },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async verificarNombreEditar(
    descripcion: string,
    PlanID: number,
  ): Promise<Plan> {
    try {
      return await this._planRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          PlanID: Not(PlanID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(PlanID: any): Promise<boolean> {
    try {
      await this._planRepository.update(PlanID, {
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
      return await this._planRepository.findAndCount({
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
      return await this._planRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          PlanID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(PlanID: number): Promise<Plan> {
    try {
      const plan: Plan = await this._planRepository.findOne(PlanID, {
        where: { Estado: EntityStatus.ACTIVE },
      });

      if (!plan) {
        throw new NotFoundException(`el plan con id: ${PlanID} no existe`);
      }
      return plan;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(plan: PlanModel, PlanID: number): Promise<boolean> {
    try {
      await this._planRepository.update(PlanID, plan);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(plan: PlanModel): Promise<Plan> {
    console.log(plan);
    try {
      const planIntance = new Plan();
      Object.assign(planIntance, plan);
      return await planIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
