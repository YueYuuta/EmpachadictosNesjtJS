import { Provider } from '@nestjs/common';
import { PlanRepoService } from './PlanRepoImplementacion';

export const PlanRepoProvider: Provider = {
  provide: 'PlanRepo',
  useClass: PlanRepoService,
};
