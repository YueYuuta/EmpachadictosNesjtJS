import { EntityRepository, Repository } from 'typeorm';
import { Despachar } from '../entidates/despachar.entity';

@EntityRepository(Despachar)
export class DespacharRepository extends Repository<Despachar> {}
