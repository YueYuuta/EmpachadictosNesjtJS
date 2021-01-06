import { EntityStatus } from '@utils/enums';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Provincia')
export class Provincia extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  ProvinciaID: number;

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
