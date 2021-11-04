import { IngresoDetalle } from '@modulos/ingreso/entidates/ingreso-detalle.entity';
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
  CreateDateColumn,
} from 'typeorm';

import { ProductoAlmacen } from './producto-almacen.entity';

@Entity('ProductoAlmacenDetalle')
export class ProductoAlmacenDetalle extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  ProductoAlmacenDetalleID: number;

  @ManyToOne(
    type => ProductoAlmacen,
    producto => producto.Detalle,
    { nullable: false },
  )
  @JoinColumn({ name: 'ProductoAlmacenID' })
  ProductoAlmacenID: number;

  @ManyToOne(type => IngresoDetalle, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'IngresoDetalleID' })
  IngresoDetalleID: number;

  @Column({ type: 'float', nullable: false })
  IngresoDetalle: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  EgresoDetalle: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioCompra: number;

  @Column({ type: 'text', nullable: true })
  Lote: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  EstadoStock: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'Fecha' })
  Fecha: Date;
}
