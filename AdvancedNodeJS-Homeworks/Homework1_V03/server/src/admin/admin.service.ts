import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { AnimalResponseDto } from 'src/animals/dtos/animals.dto';
import { Animal } from 'src/animals/interfaces/animals';
import { ZookeeperResponseDto } from 'src/zookeepers/dtos/zookeepers.dto';
import { Zookeeper } from 'src/zookeepers/interfaces/zookeeper';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ANIMAL_MODEL') private animalModel: Model<Animal>,
    @Inject('ZOOKEEPER_MODEL') private zookeeperModel: Model<Zookeeper>,
    private readonly logger: PinoLogger,
  ) {}

  async deleteAllAnimals(): Promise<AnimalResponseDto[]> {
    await this.animalModel.deleteMany();
    return [];
  }

  async deleteAllZookeepers(): Promise<ZookeeperResponseDto[]> {
    await this.zookeeperModel.deleteMany();
    return [];
  }
}
