import { Module, Global } from '@nestjs/common';
import { SharedService } from './services/shared.service';
@Global()
@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
