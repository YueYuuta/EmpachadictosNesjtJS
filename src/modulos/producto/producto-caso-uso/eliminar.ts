import { Inject, Injectable } from '@nestjs/common';
import { IProductoCasoUso } from './IProductoCasoUso';

const ProductoRepo = () => Inject('ProductoRepo');

@Injectable()
export class EliminarProductoCasoUso {
  constructor(
    @ProductoRepo() private readonly _productoRepository: IProductoCasoUso,
  ) {}

  async eliminar(ProductoID: number): Promise<boolean> {
    await this._productoRepository.obtenerPodId(ProductoID);
    return await this._productoRepository.eliminar(ProductoID);
  }
}
