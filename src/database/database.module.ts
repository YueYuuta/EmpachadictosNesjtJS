import { Module } from '@nestjs/common';
import { databaseProviders } from './database.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [...databaseProviders, ConfigModule],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
