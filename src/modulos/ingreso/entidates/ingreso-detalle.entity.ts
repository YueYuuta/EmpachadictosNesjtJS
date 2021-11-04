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

import { Ingreso } from './ingreso.entity';

@Entity('IngresoDetalle')
export class IngresoDetalle extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  IngresoDetalleID: number;

  @ManyToOne(
    type => Ingreso,
    menu => menu.Detalle,
  )
  @JoinColumn({ name: 'IngresoID' })
  IngresoID: number;

  @ManyToOne(type => Producto, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'ProductoID' })
  ProductoID: number;

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

  @Column({ type: 'text', nullable: false })
  Descripcion: string;

  @Column({ type: 'text', nullable: true })
  Lote: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioCompra: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PorcentajeGanancia: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  EstadoIva: boolean;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;
}
