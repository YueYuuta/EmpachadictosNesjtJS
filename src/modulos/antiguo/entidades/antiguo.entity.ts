import { EntityStatus } from '@utils/enums';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Antiguo')
export class Antiguo extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  AntiguoID: number;

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
