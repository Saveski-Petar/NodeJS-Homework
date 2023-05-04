import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { DatabaseModule } from 'src/database/database.module';
import { animalProvivers } from './animal.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [...animalProvivers, AnimalsService],
})
export class AnimalsModule {}
