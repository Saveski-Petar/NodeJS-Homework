import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DatabaseModule } from 'src/database/database.module';
import { AnimalsProviders } from 'src/animals/animals.provider';
import { zookeepersProviders } from 'src/zookeepers/zookeepers.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [AdminService, ...AnimalsProviders, ...zookeepersProviders],
})
export class AdminModule {}
