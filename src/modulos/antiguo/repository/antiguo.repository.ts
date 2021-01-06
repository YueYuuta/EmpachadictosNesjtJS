import { EntityRepository, Repository } from 'typeorm';
import { Antiguo } from '@modulos/antiguo/entidades/antiguo.entity';

@EntityRepository(Antiguo)
export class AntiguoRepository extends Repository<Antiguo> {}
