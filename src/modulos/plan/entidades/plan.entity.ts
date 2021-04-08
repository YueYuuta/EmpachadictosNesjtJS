import { EntityStatus } from '@utils/enums';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Plan')
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  PlanID: number;

  @Column({ type: 'text', nullable: false })
  Descripcion: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
