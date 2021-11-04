import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityStatus, TipoCompra } from '@utils/enums';
import { IngresoDetalle } from './ingreso-detalle.entity';
import { Almacen } from '@modulos/almacen/entidates/almacen.entity';
import { tipoPago } from './tipo.enum';
import { Usuario } from '@modulos/usuario/entidates/usuario.entity';
import { Proveedor } from '@modulos/proveedor/entidates/proveedor.entity';

@Entity('Ingreso')
export class Ingreso extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  IngresoID: number;

  @OneToMany(
    type => IngresoDetalle,
    ingresoDetalle => ingresoDetalle.IngresoID,
    { cascade: true, eager: true },
  )
  Detalle: IngresoDetalle[];

  @ManyToOne(type => Almacen, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'AlmacenID' })
  AlmacenID: number;

  @ManyToOne(type => Usuario, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'UsuarioID' })
  UsuarioID: number;

  @ManyToOne(type => Proveedor, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'ProveedorID' })
  ProveedorID: number;

  @Column({ type: 'text', nullable: true })
  Observacion: string;

  @Column({ type: 'text', nullable: true })
  TipoCompra: TipoCompra;

  @Column({ type: 'text', nullable: true })
  TipoPago: tipoPago;

  @Column({ type: 'float', nullable: false, default: 0 })
  Subtotal0: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  Subtotal12: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  Iva: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  Subtotal: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  Total: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  TotalCompra: number;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
