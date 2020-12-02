import { EntityStatus } from '@utils/enums/entity-status.enum';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Almacen')
export class Almacen extends BaseEntity {
  @PrimaryGeneratedColumn()
  AlmacenID: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  RazonSocial: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  NombreComercial: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  Sucuarsal: string;

  @Column({ type: 'text', nullable: false })
  Direccion: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  Telefono: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  Correo: string;

  @Column({ type: 'varchar', length: 13, nullable: false })
  Ruc: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
