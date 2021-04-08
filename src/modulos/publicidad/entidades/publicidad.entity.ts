import { EntityStatus } from '@utils/enums';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Publicidad')
export class Publicidad extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  PublicidadID: number;

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
