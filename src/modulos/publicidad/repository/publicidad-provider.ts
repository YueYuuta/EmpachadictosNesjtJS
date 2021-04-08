import { Provider } from '@nestjs/common';
import { PublicidadRepoService } from './PublicidadRepoImplementacion';

export const PublicidadRepoProvider: Provider = {
  provide: 'PublicidadRepo',
  useClass: PublicidadRepoService,
};
