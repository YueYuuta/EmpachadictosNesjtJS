import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { UsuarioDetalle } from './usuario-detalle.entity';

@Entity('Usuario')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  UsuarioID: number;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  Usuario: string;

  @OneToOne(
    () => UsuarioDetalle,
    usuarioDetalle => usuarioDetalle.Usuario,
    { cascade: true, eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  ) // specify inverse side as a second parameter
  Detalle: UsuarioDetalle;

  @Column({ type: 'varchar', nullable: true, length: 150 })
  Correo: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  Contraseña: string;

  @Column({ type: 'varchar', nullable: false, length: 20 })
  Rol: string;

  @Column({ type: 'boolean', default: true })
  Estado: boolean;

  @Column({ type: 'timestamp', nullable: true })
  Fecha: string;
}
