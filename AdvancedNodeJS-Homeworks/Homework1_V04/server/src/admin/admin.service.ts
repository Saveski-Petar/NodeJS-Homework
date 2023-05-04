import { Inject, Injectable } from '@nestjs/common';
import { Animal } from 'src/animals/animal.entity';
import { Zookeeper } from 'src/zookeepers/zookeepers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ANIMAL_REPOSITORY')
    private animalRepository: Repository<Animal>,
    @Inject('ZOOKEEPER_REPOSITORY')
    private zookeeperRepository: Repository<Zookeeper>,
  ) {}

  async deleteZookeepers(): Promise<void> {
    await this.zookeeperRepository.delete({});
  }

  async deleteAnimals(): Promise<void> {
    await this.animalRepository.delete({});
  }
}
