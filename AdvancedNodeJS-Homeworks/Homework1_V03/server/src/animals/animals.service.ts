import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Animal } from './interfaces/animals';
import { Model, ObjectId } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from './dtos/animals.dto';
import { AnimalQueryDto } from './dtos/animal-query.Dto';

@Injectable()
export class AnimalsService {
  constructor(
    @Inject('ANIMAL_MODEL') private animalModel: Model<Animal>,
    private readonly logger: PinoLogger,
  ) {}

  async addAnimal(animalData: AnimalCreateDto): Promise<AnimalResponseDto> {
    return this.animalModel.create(animalData);
  }

  async getAnimals(query: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    const animals = await this.animalModel.find({});

    if (animals.length === 0)
      throw new NotFoundException('There are no animals in our database');

    if (query.location) {
      const animal = await this.animalModel.find({ location: query.location });

      if (animal.length === 0)
        throw new NotFoundException(
          'There are 0 animals with that location in our Database',
        );

      return animal;
    }

    return animals;
  }

  async getAnimalByID(animalID: string): Promise<AnimalResponseDto> {
    const animal = await this.animalModel
      .findById(animalID)
      .populate('zookeeper');

    if (!animal)
      throw new NotFoundException(
        `Animal with the id of ${animalID} is not found in our database`,
      );

    return animal;
  }

  async updateAnimal(
    animalID: string,
    animalUpdateData: AnimalUpdateDto,
  ): Promise<AnimalResponseDto> {
    const animal = this.getAnimalByID(animalID);

    if (!animal)
      throw new NotFoundException(
        `The animal with the ${animalID} is not found`,
      );

    return this.animalModel.findByIdAndUpdate(animalID, animalUpdateData, {
      new: true,
      runValidators: true,
    });
  }
  async deleteAnimal(animalID: string): Promise<AnimalResponseDto> {
    return this.animalModel.findByIdAndDelete(animalID);
  }
}
