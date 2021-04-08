import { EntityStatus } from '@utils/enums/entity-status.enum';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Enlace } from '../../enlace/entidades/enlace.entity';
import { Parroquia } from '../../parroquia/entidades/parroquia.entity';
import { Termino } from '../../termino/entidades/termino.entity';
import { Publicidad } from '../../publicidad/entidades/publicidad.entity';
import { Antiguo } from '../../antiguo/entidades/antiguo.entity';

@Entity('Cliente')
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn()
  ClienteID: number;

  @ManyToOne(type => Enlace, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'EnlaceID' })
  Enlace: number;

  @ManyToOne(type => Parroquia, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'ParroquiaID' })
  Parroquia: number;

  @ManyToOne(type => Termino, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'TerminoID' })
  Termino: number;

  @ManyToOne(type => Publicidad, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'PublicidadID' })
  Publicidad: number;

  @ManyToOne(type => Antiguo, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'AntiguoID' })
  Antiguo: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  Nombre: string;

  @Column({ type: 'text', nullable: true })
  Direccion: string;

  @Column({ type: 'text', nullable: true })
  Referencia: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  Telefono: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  Correo: string;

  @Column({ type: 'varchar', length: 13, nullable: true })
  Ruc: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  Cedula: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  Otro: string;

  @Column({ type: 'float', default: 0 })
  Compras: number;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
