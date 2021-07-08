import { Almacen } from '@modulos/almacen/entidates/almacen.entity';
import { Pedido } from '@modulos/pedido/entidates/pedido.entity';
import { EntityStatus } from '@utils/enums';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Mesa')
export class Mesa extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  MesaID: number;

  @ManyToOne(type => Almacen, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'AlmacenID' })
  AlmacenID: number;

  @Column({ type: 'integer', nullable: true })
  PedidoID: number;

  @Column({ type: 'text', nullable: false })
  Descripcion: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({ type: 'boolean', default: EntityStatus.INACTIVE })
  Ocupado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
