import { Provider } from '@nestjs/common';
import { ProductoRepoService } from './ProductoRepoImplementacion';

export const ProductoRepoProvider: Provider = {
  provide: 'ProductoRepo',
  useClass: ProductoRepoService,
};
