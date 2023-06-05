import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Animal } from "./animal.entity";
import { ILike, Repository } from "typeorm";
import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from "./dtos/animal.dto";
import { AnimalQueryDto } from "./dtos/animal-query.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async addAnimal(animalData: AnimalCreateDto): Promise<AnimalResponseDto> {
    return await this.animalRepository.save(animalData);
  }

  async getAnimals(query?: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    const animals = await this.animalRepository.find({
      relations: ["zookeeper"],
    });

    if (animals.length === 0)
      throw new NotFoundException("No animals found in our database");

    if (query && query.location) {
      const animalsByLocation = await this.animalRepository.find({
        where: { location: query.location },
      });
      if (animalsByLocation.length === 0)
        throw new NotFoundException(
          `No animals found in our database with this location ${query.location}`,
        );

      return animalsByLocation;
    }

    if (query && query.type) {
      const animalsByType = await this.animalRepository.find({
        where: { type: ILike(`%${query.type}%`) },
      });
      if (animalsByType.length === 0)
        throw new NotFoundException(
          `No animals found in our database with this type ${query.type}`,
        );

      return animalsByType;
    }

    return animals;
  }

  async getAnimalByID(animalID: string): Promise<AnimalResponseDto> {
    const animal = await this.animalRepository.findOne({
      where: { id: animalID },
      relations: ["zookeeper"],
    });

    if (!animal)
      throw new NotFoundException(
        `Animal with the id of ${animalID} doesn't exist`,
      );

    return animal;
  }

  async updateAnimal(
    animalID: string,
    animalUpdatedInfo: AnimalUpdateDto,
  ): Promise<AnimalResponseDto> {
    await this.getAnimalByID(animalID);

    return await this.animalRepository.save({
      id: animalID,
      ...animalUpdatedInfo,
    });
  }

  async addZookeeperToAnimal(
    animalID: string,
    zookeeperId: string,
  ): Promise<AnimalResponseDto> {
    const animal = await this.getAnimalByID(animalID);

    const alreadyHasAZookeeper = animal?.zookeeperId?.length;

    if (alreadyHasAZookeeper) {
      throw new BadRequestException(
        `Animal with ID: ${animalID} has a zookeeper .`,
      );
    }
    await this.animalRepository.save({
      id: animalID,
      zookeeperId,
    });
    return this.getAnimalByID(animalID);
  }

  async softDeleteAnimal(animalID: string): Promise<void> {
    await this.animalRepository.softDelete(animalID);
  }

  async hardDeleteAnimal(animalID: string): Promise<void> {
    await this.animalRepository.delete(animalID);
  }
}
