import { EntityStatus, ImageDefault } from '@utils/enums';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Categoria')
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  CategoriaID: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Nombre: string;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({ type: 'text', default: ImageDefault.CATEGORIA, nullable: true })
  Imagen: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  Fecha: string;
}
