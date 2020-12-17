import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityStatus, ImageDefault } from '@utils/enums';
import { MenuDetalle } from './menu-detalle.entity';

@Entity('Menu')
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  MenuID: number;

  @OneToMany(
    type => MenuDetalle,
    meduDetalle => meduDetalle.Menu,
    { cascade: true, eager: true },
  )
  Detalle: MenuDetalle[];

  @Column({ type: 'text', nullable: false })
  Descripcion: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioCompra: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioSinIva: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioVenta: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PorcentajeGanancia: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  EstadoIva: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  EstadoPrecioVentaDinamico: boolean;

  @Column({
    type: 'text',
    nullable: true,
    default: ImageDefault.PRODUCT,
  })
  Imagen: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
