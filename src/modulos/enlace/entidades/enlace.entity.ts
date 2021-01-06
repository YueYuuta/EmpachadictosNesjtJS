import { EntityStatus } from '@utils/enums';
import { Plan } from '../../plan/entidades/plan.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Enlace')
export class Enlace extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  EnlaceID: number;

  @ManyToOne(type => Plan, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'PlanID' })
  Plan: number;

  @Column({ type: 'text', nullable: false })
  Descripcion: string;

  @Column({ type: 'varchar', nullable: false })
  VelocidadSubida: string;

  @Column({ type: 'varchar', nullable: false })
  VelocidadBajada: string;

  @Column({ type: 'float', nullable: false })
  Precio: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
