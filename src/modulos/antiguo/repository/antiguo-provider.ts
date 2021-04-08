import { Provider } from '@nestjs/common';
import { AntiguoRepoService } from './AntiguoRepoImplementacion';

export const AntiguoRepoProvider: Provider = {
  provide: 'AntiguoRepo',
  useClass: AntiguoRepoService,
};
