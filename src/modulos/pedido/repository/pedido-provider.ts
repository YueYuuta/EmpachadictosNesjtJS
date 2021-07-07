import { Provider } from '@nestjs/common';
import { PedidoRepoService } from './PedidoRepoImplementacion';

export const PedidoRepoProvider: Provider = {
  provide: 'PedidoRepo',
  useClass: PedidoRepoService,
};
