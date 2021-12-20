import { EntityStatus } from '@utils/enums/entity-status.enum';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('Cliente')
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn()
  ClienteID: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  Nombre: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  Telefono: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  Correo: string;

  @Column({ type: 'varchar', length: 13, nullable: true })
  Ruc: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  Cedula: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  Otro: string;

  @Column({ type: 'float', default: 0 })
  Compras: number;

  @Column({ type: 'text', nullable: true })
  Direccion: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
