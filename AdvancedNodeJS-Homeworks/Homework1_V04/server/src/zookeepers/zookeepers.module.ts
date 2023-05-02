import { Module } from '@nestjs/common';
import { ZookeepersController } from './zookeepers.controller';
import { ZookeepersService } from './zookeepers.service';
import { DatabaseModule } from 'src/database/database.module';
import { zookeeperProviders } from './zookeepers.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ZookeepersController],
  providers: [...zookeeperProviders, ZookeepersService],
})
export class ZookeepersModule {}
