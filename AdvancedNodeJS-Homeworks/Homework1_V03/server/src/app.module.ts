import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './database/database.module';
import { ZookeepersModule } from './zookeepers/zookeepers.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnimalsModule } from './animals/animals.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    DatabaseModule,
    ZookeepersModule,
    AnimalsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
