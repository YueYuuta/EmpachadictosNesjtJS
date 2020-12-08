import { Modulo } from './modulo.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { RolPermiso } from './rol-permiso.entity';

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

  @OneToMany(
    type => RolPermiso,
    rolPermiso => rolPermiso.Permiso,
    { cascade: true, eager: true },
  )
  RolPermiso: RolPermiso[];

  @Column({ type: 'varchar', nullable: false })
  Ruta: string;

  @Column({ type: 'varchar', nullable: false })
  Icono: string;

  @Column({ type: 'varchar', nullable: false })
  Titulo: string;

  @Column({ type: 'varchar', nullable: false })
  Descripcion: string;
}
