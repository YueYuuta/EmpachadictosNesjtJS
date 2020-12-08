import { Rol } from './rol.entity';
import { Permiso } from './permiso.entity';
import { EntityStatus } from '../../../utils/enums/entity-status.enum';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('RolPermiso')
export class RolPermiso extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  RolPermisoID: number;

  @ManyToOne(
    type => Rol,
    rol => rol.RolPermiso,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'RolID' })
  Rol: number;

  @ManyToOne(
    type => Permiso,
    rol => rol.RolPermiso,
  )
  @JoinColumn({ name: 'PermisoID' })
  Permiso: number;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE, nullable: true })
  Estado: boolean;
}
