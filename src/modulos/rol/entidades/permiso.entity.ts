import { Modulo } from './modulo.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity('Permiso')
@Unique(['Ruta', 'Titulo'])
export class Permiso extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  PermisoID: number;

  @ManyToOne(type => Modulo, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'ModuloID' })
  Modulo: number;

  @Column({ type: 'varchar', nullable: false })
  Ruta: string;

  @Column({ type: 'varchar', nullable: false })
  Icono: string;

  @Column({ type: 'varchar', nullable: false })
  Titulo: string;

  @Column({ type: 'varchar', nullable: false })
  Descripcion: string;
}
