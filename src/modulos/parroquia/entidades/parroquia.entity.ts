import { EntityStatus } from '@utils/enums';
import { Canton } from '@modulos/canton/entidades/canton.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Parroquia')
export class Parroquia extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  ParroquiaID: number;

  @ManyToOne(type => Canton, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'CantonID' })
  Canton: number;

  @Column({ type: 'text', nullable: false })
  Nombre: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
