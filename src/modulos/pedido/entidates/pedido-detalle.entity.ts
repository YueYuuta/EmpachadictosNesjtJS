import { Menu } from '@modulos/menu/entidates/menu.entity';
import { Producto } from '@modulos/producto/entidates/producto.entity';
import { EntityStatus } from '@utils/enums';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Pedido } from './pedido.entity';

@Entity('PedidoDetalle')
export class PedidoDetalle extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  PedidoDetalleID: number;

  @ManyToOne(
    type => Pedido,
    menu => menu.Detalle,
  )
  @JoinColumn({ name: 'PedidoID' })
  PedidoID: number;

  @ManyToOne(type => Menu, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'MenuID' })
  MenuID: number;

  @Column({ type: 'float', nullable: false })
  Cantidad: number;

  @Column({ type: 'float', nullable: false })
  Total: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  TotalsinIva: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  Iva: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  TotalIva: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  TotalCompra: number;

  @Column({ type: 'text', nullable: false })
  Descripcion: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioCompra: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioSinIva: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioVenta: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PorcentajeGanancia: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  EstadoIva: boolean;

  @Column({ type: 'boolean', default: true, nullable: false })
  EstadoPrecioVentaDinamico: boolean;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;
}
