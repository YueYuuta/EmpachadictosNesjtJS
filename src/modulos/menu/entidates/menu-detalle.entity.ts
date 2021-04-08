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

import { Menu } from './menu.entity';

@Entity('MenuDetalle')
export class MenuDetalle extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  MenuDetalleID: number;

  @ManyToOne(
    type => Menu,
    menu => menu.Detalle,
  )
  @JoinColumn({ name: 'MenuID' })
  Menu: number;

  @ManyToOne(type => Producto, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'ProductoID' })
  ProductoID: number;

  @Column({ type: 'float', nullable: false })
  Cantidad: number;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;
}
