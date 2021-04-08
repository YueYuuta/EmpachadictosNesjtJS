import { EntityStatus } from '@utils/enums';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Termino')
export class Termino extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  TerminoID: number;

  @Column({ type: 'text', nullable: false })
  Descripcion: string;

  @Column({ type: 'integer', nullable: false })
  Dias: number;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
