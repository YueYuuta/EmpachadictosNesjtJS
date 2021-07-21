import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CrearMenuAlmacenIngresoDto } from '../api/dto';

import { IMenuAlmacenCasoUso } from './IMenuAlmacenCasoUso';
import { LeerMenuAlmacenCasoUso } from './leer';
import { LeerAlmacenCasoUso } from '@modulos/almacen/almacen-caso-uso/leer';
import { CrearMenuAlmacenEgresoModel } from './models/menu-almacen';

const MenuAlmacenRepo = () => Inject('MenuAlmacenRepo');

@Injectable()
export class CrearMenuAlmacenCasoUso {
  constructor(
    @MenuAlmacenRepo()
    private readonly _menuAlmacenRepository: IMenuAlmacenCasoUso,
    private readonly _menuService: LeerMenuAlmacenCasoUso,
    private readonly _almacenService: LeerAlmacenCasoUso,
    private readonly _menuAlmacenService: LeerMenuAlmacenCasoUso,
  ) {}

  async crearIngreso(Ingreso: CrearMenuAlmacenIngresoDto): Promise<boolean> {
    let menuAlmacenGuaradado;
    // await this._menuService.obtenerProId(Ingreso.MenuID);
    await this._almacenService.obtenerProId(Ingreso.AlmacenID);
    const menuAlmacen = await this._menuAlmacenService.ExisteMenuEnELAlmacen(
      Ingreso.AlmacenID,
      Ingreso.MenuID,
    );
    console.log('sfsfkdkdkdkdkddkddkdkdkkd', Ingreso);
    if (menuAlmacen) {
      console.log('sfsfkdkdkdkdkddkddkdkdkkd');
      const IngresoNuevo: number = menuAlmacen.Ingreso + Ingreso.Ingreso;
      menuAlmacenGuaradado = await this._menuAlmacenRepository.cambioIngreso(
        IngresoNuevo,
        menuAlmacen.MenuAlmacenID,
      );
    } else {
      menuAlmacenGuaradado = await this._menuAlmacenRepository.crear(Ingreso);
    }
    return menuAlmacenGuaradado;
  }

  async crearEgreso(Egreso: CrearMenuAlmacenEgresoModel): Promise<boolean> {
    let menuAlmacenGuaradado;
    // await this._menuService.obtenerProId(Egreso.MenuAlmacenID);
    await this._almacenService.obtenerProId(Egreso.AlmacenID);
    const menuAlmacen = await this._menuAlmacenService.ExisteMenuEnELAlmacen(
      Egreso.AlmacenID,
      Egreso.MenuID,
    );

    if (menuAlmacen) {
      const EgresoNuevo: number = menuAlmacen.Egreso + Egreso.Egreso;
      menuAlmacenGuaradado = await this._menuAlmacenRepository.cambioEgreso(
        EgresoNuevo,
        menuAlmacen.MenuAlmacenID,
      );
    } else {
      throw new NotFoundException('No existe el menu en el almacen!');
    }
    return menuAlmacenGuaradado;
  }
}
