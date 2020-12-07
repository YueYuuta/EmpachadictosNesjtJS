import { RolPermiso } from './rol-permiso.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Unique,
} from 'typeorm';
import { EntityStatus } from '@utils/enums';

@Entity('Rol')
@Unique(['Nombre'])
export class Rol extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  RolID: number;

  @ManyToMany(
    type => RolPermiso,
    rolPermiso => rolPermiso.Rol,
  )
  RolPermiso: RolPermiso[];

  @Column({ type: 'varchar', nullable: false })
  Nombre: string;

  @Column({ type: 'timestamp', nullable: true })
  Fecha: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;
}
