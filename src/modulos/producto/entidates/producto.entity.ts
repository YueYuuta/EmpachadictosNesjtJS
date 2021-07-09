import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ImageDefault } from '@utils/enums';
import { EntityStatus } from '@utils/enums/entity-status.enum';
import { Categoria } from '@modulos/categoria/entidades/categoria.entity';
import { PantallaEnum } from './pantalla.enum';

@Entity('Producto')
export class Producto extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  ProductoID: number;

  @ManyToOne(type => Categoria, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'CategoriaID' })
  Categoria: number;

  @Column({ type: 'text', nullable: false })
  Descripcion: string;

  @Column({ type: 'text', nullable: false })
  Pantalla: PantallaEnum;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioCompra: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioSinIva: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioSinIvaDescuento: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PrecioVenta: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PorcentajeGanancia: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  EstadoIva: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  EstadoDescuento: boolean;

  @Column({ type: 'float', nullable: true })
  PrecioVentaConDescuento: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  PorcentajeGananciaDescuento: number;

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
