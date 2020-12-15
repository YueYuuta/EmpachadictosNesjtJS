import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsuarioDetalle } from './usuario-detalle.entity';
import { Rol } from '../../rol/entidades/rol.entity';

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

  @ManyToOne(type => Rol, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'RolID' })
  Rol: number;

  @Column({ type: 'boolean', default: true })
  Estado: boolean;

  @Column({ type: 'timestamp', nullable: true })
  Fecha: string;
}
