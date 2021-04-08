import { EntityRepository, Repository } from 'typeorm';
import { Canton } from '@modulos/canton/entidades/canton.entity';

@EntityRepository(Canton)
export class CantonRepository extends Repository<Canton> {}
