import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { EntityStatus } from '@utils/enums';
import { Almacen } from '@modulos/almacen/entidates/almacen.entity';
import { Producto } from '@modulos/producto/entidates/producto.entity';
import { ProductoAlmacenDetalle } from './producto-almacen-detalle.entity';

@Entity('ProductoAlmacen')
export class ProductoAlmacen extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  ProductoAlmacenID: number;

  @ManyToOne(type => Almacen, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'AlmacenID' })
  AlmacenID: number;

  @ManyToOne(type => Producto, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'ProductoID' })
  ProductoID: number;

  @OneToMany(
    type => ProductoAlmacenDetalle,
    productoAlmacenDetalle => productoAlmacenDetalle.ProductoAlmacenID,
    { cascade: true, eager: true },
  )
  Detalle: ProductoAlmacenDetalle[];

  // @Column({ type: 'float', nullable: false, default: 0 })
  // Ingreso: number;

  // @Column({ type: 'float', nullable: false, default: 0 })
  // Egreso: number;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
