import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityStatus } from '@utils/enums';
import { Almacen } from '@modulos/almacen/entidates/almacen.entity';
import { Menu } from '@modulos/menu/entidates/menu.entity';

@Entity('MenuAlmacen')
export class MenuAlmacen extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  MenuAlmacenID: number;

  @ManyToOne(type => Almacen, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'AlmacenID' })
  AlmacenID: number;

  @ManyToOne(type => Menu, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'MenuID' })
  MenuID: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  Ingreso: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  Egreso: number;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
