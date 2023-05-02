import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { AnimalsProviders } from './animals.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, ...AnimalsProviders],
})
export class AnimalsModule {}
