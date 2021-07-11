import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityStatus } from '@utils/enums';
import { DespacharDetalle } from './despachar-detalle.entity';
import { Almacen } from '@modulos/almacen/entidates/almacen.entity';
import { Usuario } from '@modulos/usuario/entidates/usuario.entity';
import { Mesa } from '@modulos/mesa/entidades/mesa.entity';
import { Pedido } from '@modulos/pedido/entidates/pedido.entity';

@Entity('Despachar')
export class Despachar extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  DespacharID: number;

  @OneToMany(
    type => DespacharDetalle,
    pedidoDetalle => pedidoDetalle.DespacharID,
    { cascade: true, eager: true },
  )
  Detalle: DespacharDetalle[];

  @ManyToOne(type => Mesa, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'MesaID' })
  MesaID: number;

  @ManyToOne(type => Almacen, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'AlmacenID' })
  AlmacenID: number;

  @ManyToOne(type => Pedido, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'PedidoID' })
  PedidoID: number;

  @ManyToOne(type => Usuario, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'UsuarioID' })
  UsuarioID: number;

  @Column({ type: 'boolean', default: EntityStatus.INACTIVE })
  EstadoDespachar: boolean;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({ type: 'varchar' })
  Tipo: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
