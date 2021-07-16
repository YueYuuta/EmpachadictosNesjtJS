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

import { Despachar } from './despachar.entity';

@Entity('DespacharDetalle')
export class DespacharDetalle extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  DespacharDetalleID: number;

  @ManyToOne(
    type => Despachar,
    despachar => despachar.Detalle,
  )
  @JoinColumn({ name: 'DespacharID' })
  DespacharID: number;

  @ManyToOne(type => Producto, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'ProductoID' })
  ProductoID: number;

  @Column({ type: 'float', nullable: false })
  Cantidad: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  EstadoDespachar: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  EstadoDespacharTipo: boolean;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;
}
