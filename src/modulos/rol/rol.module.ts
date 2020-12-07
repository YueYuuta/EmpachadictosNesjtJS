import { Module } from '@nestjs/common';
import { RolController } from './api/rol.controller';

@Module({
  controllers: [RolController],
})
export class RolModule {}
