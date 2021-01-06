import { Provider } from '@nestjs/common';
import { TerminoRepoService } from './TerminoRepoImplementacion';

export const TerminoRepoProvider: Provider = {
  provide: 'TerminoRepo',
  useClass: TerminoRepoService,
};
