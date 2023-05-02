import { Animal } from './interface/animal.interface';
import { animalProviders } from './animal.providers';
import { Repository } from 'typeorm';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from './dtos/animal.dto';
import { AnimalQueryDto } from './dtos/animal-query.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @Inject('ANIMAL_REPOSITORY') private animalRepository: Repository<Animal>,
  ) {}

  async addAnimal(animalData: AnimalCreateDto): Promise<AnimalResponseDto> {
    return await this.animalRepository.save(animalData);
  }

  async getAnimal(query: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    const animals = await this.animalRepository.find({});

    if (animals.length === 0)
      throw new NotFoundException('There are no animals found in our database');

    if (query && query.location) {
      const animalByLocation = await this.animalRepository
        .createQueryBuilder('animal')
        .where('animal.location = :location', {
          location: query.location,
        })
        .getMany();

      if (animalByLocation.length === 0)
        throw new NotFoundException(
          `There are 0 animals with this location ${query.location} in our database `,
        );
      return animalByLocation;
    }

    return animals;
  }

  async getAnimalByID(animalID: string): Promise<AnimalResponseDto[]> {
    const animal = await this.animalRepository.find({
      where: { id: animalID },
    });

    if (animal.length === 0)
      throw new NotFoundException(
        `Animal with the id of ${animalID} is not found`,
      );

    return animal;
  }

  async updateAnimal(
    animalID: string,
    animalUpdatedInfo: AnimalUpdateDto,
  ): Promise<AnimalResponseDto> {
    const animal = await this.getAnimalByID(animalID);

    if (!animal)
      throw new NotFoundException(
        `Animal with the id of ${animalID} is not found`,
      );

    return await this.animalRepository.save({
      id: animalID,
      ...animalUpdatedInfo,
    });
  }

  async deleteAnimal(animalID: string): Promise<AnimalResponseDto> {
    const animal = await this.getAnimalByID(animalID);

    if (!animal)
      throw new NotFoundException(
        `Animal with the id of ${animalID} is not found`,
      );

    await this.animalRepository.delete(animalID);
    return;
  }
}
