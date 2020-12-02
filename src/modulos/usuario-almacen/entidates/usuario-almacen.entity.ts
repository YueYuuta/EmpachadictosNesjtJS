import { EntityStatus } from '@utils/enums/entity-status.enum';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '@modulos/usuario/entidates/usuario.entity';
import { Almacen } from '@modulos/almacen/entidates/almacen.entity';

@Entity('UsuarioAlmacen')
export class UsuarioAlmacen extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  UsuarioAlmacenID: number;

  @ManyToOne(type => Usuario, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'UsuarioID' })
  Usuario: number;

  @ManyToOne(type => Almacen, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'AlmacenID' })
  Almacen: number;

  @Column({ type: 'boolean', default: EntityStatus.ACTIVE })
  Estado: boolean;

  @Column({ type: 'timestamp', nullable: true })
  Fecha: string;
}
