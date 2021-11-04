// import { Inject, Injectable } from '@nestjs/common';
// import { ImageDefault, PathFile } from '@utils/enums';
// import { plainToClass } from 'class-transformer';
// import { LeerPedidoDto } from '../api/dto';
// import { IPedidoCasoUso } from './IIngresoCasoUso';

// const PedidoRepo = () => Inject('PedidoRepo');

// @Injectable()
// export class LeerPedidoCasoUso {
//   constructor(
//     @PedidoRepo() private readonly _pedidoRepository: IPedidoCasoUso,
//   ) {}

//   async obtenerProId(PedidoID: number): Promise<LeerPedidoDto> {
//     const pedido = await this._pedidoRepository.obtenerPodId(PedidoID);
//     return plainToClass(LeerPedidoDto, pedido);
//   }

//   async obtenerPaginado(
//     desde: number,
//     limite: number,
//     termino?: string,
//   ): Promise<LeerPedidoDto[]> {
//     let pedidos: any;
//     if (termino) {
//       termino = termino.trim();
//       pedidos = await this._pedidoRepository.obtenerPorBusqueda(
//         desde,
//         limite,
//         termino,
//       );
//     } else {
//       pedidos = await this._pedidoRepository.obtenerPaginado(desde, limite);
//     }
//     return pedidos.map((pedido: any) => plainToClass(LeerPedidoDto, pedido));
//   }
// }
