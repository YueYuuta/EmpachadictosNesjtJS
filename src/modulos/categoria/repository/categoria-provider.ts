import { Provider } from '@nestjs/common';
import { CategoriaRepoService } from './CategoriaRepoImplementacion';

export const CategoriaRepoProvider: Provider = {
  provide: 'CategoriaRepo',
  useClass: CategoriaRepoService,
};
