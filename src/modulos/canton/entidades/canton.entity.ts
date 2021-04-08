import { Provincia } from '@modulos/provincia/entidades/provincia.entity';
import { EntityStatus } from '@utils/enums';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Canton')
export class Canton extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  CantonID: number;

  @ManyToOne(type => Provincia, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'ProvinciaID' })
  Provincia: number;

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
