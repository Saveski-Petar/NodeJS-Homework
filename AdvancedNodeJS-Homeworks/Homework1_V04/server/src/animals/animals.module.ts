import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { animalProviders } from './animal.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalsController],
  providers: [...animalProviders, AnimalsService],
})
export class AnimalsModule {}
