import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { ImageDefault } from '../../../utils/enums/image-default.enum';

@Entity('UsuarioDetalle')
export class UsuarioDetalle extends BaseEntity {
  @PrimaryGeneratedColumn()
  UsuarioDetalleID: number;

  @Column({ type: 'varchar', nullable: true, length: 150 })
  Nombres: string;

  @Column({ type: 'varchar', nullable: true, length: 150 })
  Apellidos: string;

  @Column({ type: 'boolean', default: true })
  Estado: boolean;

  @Column({ type: 'text', default: ImageDefault.USER, nullable: true })
  Avatar: string;

  @OneToOne(
    () => Usuario,
    usuario => usuario.Detalle,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  ) // specify inverse side as a second parameter
  @JoinColumn({ name: 'UsuarioID' })
  Usuario: Usuario;
}
