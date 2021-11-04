import { Provider } from '@nestjs/common';
import { ProductoAlmacenRepoService } from './ProductoAlmacenRepoImplementacion';

export const ProductoAlmacenRepoProvider: Provider = {
  provide: 'ProductoAlmacenRepo',
  useClass: ProductoAlmacenRepoService,
};
