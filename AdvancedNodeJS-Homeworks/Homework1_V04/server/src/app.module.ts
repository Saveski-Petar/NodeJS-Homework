import { Module } from '@nestjs/common';
import { ZookeepersModule } from './zookeepers/zookeepers.module';
import { AnimalsModule } from './animals/animals.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ZookeepersModule, AnimalsModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
