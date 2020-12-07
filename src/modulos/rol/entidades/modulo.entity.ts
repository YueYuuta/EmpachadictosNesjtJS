import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity('Modulo')
@Unique(['Nombre'])
export class Modulo extends BaseEntity {
  @PrimaryGeneratedColumn()
  ModuloID: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  Nombre: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  Icono: string;
}
