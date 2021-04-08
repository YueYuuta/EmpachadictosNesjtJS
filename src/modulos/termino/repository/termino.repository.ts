import { EntityRepository, Repository } from 'typeorm';
import { Termino } from '@modulos/termino/entidades/termino.entity';

@EntityRepository(Termino)
export class TerminoRepository extends Repository<Termino> {}
