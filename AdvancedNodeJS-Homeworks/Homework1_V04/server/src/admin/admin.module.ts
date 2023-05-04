import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { animalProvivers } from 'src/animals/animal.providers';
import { zookeeperProviders } from 'src/zookeepers/zookeepers.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [...animalProvivers, ...zookeeperProviders, AdminService],
})
export class AdminModule {}
