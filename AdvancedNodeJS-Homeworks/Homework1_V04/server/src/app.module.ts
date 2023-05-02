import { Module } from '@nestjs/common';
import { ZookeepersModule } from './zookeepers/zookeepers.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [ZookeepersModule, AnimalsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
