import { EntityRepository, Repository } from 'typeorm';
import { Mesa } from '@modulos/mesa/entidades/mesa.entity';

@EntityRepository(Mesa)
export class MesaRepository extends Repository<Mesa> {}
