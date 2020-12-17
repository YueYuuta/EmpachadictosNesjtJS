import { EntityRepository, Repository } from 'typeorm';
import { Categoria } from '@modulos/categoria/entidades/categoria.entity';

@EntityRepository(Categoria)
export class CategoriaRepository extends Repository<Categoria> {}
