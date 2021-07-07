import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityStatus, ImageDefault, TipoFactura } from '@utils/enums';
import { PedidoDetalle } from './pedido-detalle.entity';
import { Cliente } from '@modulos/cliente/entidates/cliente.entity';
import { Almacen } from '@modulos/almacen/entidates/almacen.entity';
import { tipoPago } from './tipo.enum';
import { Usuario } from '@modulos/usuario/entidates/usuario.entity';

@Entity('Pedido')
export class Pedido extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  PedidoID: number;

  @OneToMany(
    type => PedidoDetalle,
    pedidoDetalle => pedidoDetalle.PedidoID,
    { cascade: true, eager: true },
  )
  Detalle: PedidoDetalle[];

  @ManyToOne(type => Cliente, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'ClienteID' })
  ClienteID: number;

  @ManyToOne(type => Almacen, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'AlmacenID' })
  AlmacenID: number;

  @ManyToOne(type => Almacen, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'MesaID' })
  MesaID: number;

  @ManyToOne(type => Usuario, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'UsuarioID' })
  UsuarioID: number;

  @Column({ type: 'text', nullable: true })
  Observacion: string;

  @Column({ type: 'text', nullable: true })
  TipoFactura: TipoFactura;

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
