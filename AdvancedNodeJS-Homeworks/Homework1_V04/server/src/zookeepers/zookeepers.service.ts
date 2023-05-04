import { Repository } from 'typeorm';
import { Zookeeper } from './zookeepers.entity';
import {
  Inject,
  Injectable,
  NotFoundException,
  Delete,
  Query,
} from '@nestjs/common';
import { ZookeeperStatus } from './interfaces/zookeeper.interface';
import {
  ZookeeperCreateDto,
  ZookeeperResponseDto,
  ZookeeperUpdateInfo,
} from './dtos/zookeeper.dto';
import { ZookeeperQueryDto } from './dtos/zookeeper-query.dto';

@Injectable()
export class ZookeepersService {
  constructor(
    @Inject('ZOOKEEPER_REPOSITORY')
    private zookeeperRepository: Repository<Zookeeper>,
  ) {}

  async getZookeeper(
    query?: ZookeeperQueryDto,
  ): Promise<ZookeeperResponseDto[]> {
    const zookeeper = await this.zookeeperRepository.find({});

    if (zookeeper.length === 0)
      throw new NotFoundException(`There  are 0  zookeepers in Database`);

    if (query) {
      if (query.name) {
        const zookeepersByName = await this.zookeeperRepository
          .createQueryBuilder('zookeeper')
          .leftJoinAndSelect('zookeeper.animals', 'animals')
          .where('zookeeper.name LIKE :name', { name: `%${query.name}%` })
          .getMany();

        if (zookeepersByName.length === 0)
          throw new NotFoundException(
            'There are no found zookeepers with that name ',
          );

        return zookeepersByName;
      }
      if (query.isActive) {
        return await this.zookeeperRepository
          .createQueryBuilder('zookeeper')
          .where('zookeeper.isActive = :isActive', {
            isActive: query.isActive,
          })
          .getMany();
      }
    }

    return zookeeper;
  }

  async addZookeeper(
    zookeeperInfo: ZookeeperCreateDto,
  ): Promise<ZookeeperResponseDto> {
    return await this.zookeeperRepository.save(zookeeperInfo);
  }

  async updateZookeeper(
    zookeeperID: string,
    zookeeperUpdateInfo: ZookeeperUpdateInfo,
  ): Promise<ZookeeperResponseDto> {
    const zookeeper = await this.zookeeperRepository.findOne({
      where: { id: zookeeperID },
    });
    if (!zookeeper)
      throw new NotFoundException(
        `Zookeeper with the id of ${zookeeperID} is not found in our database`,
      );

    return await this.zookeeperRepository.save({
      id: zookeeperID,
      ...zookeeperUpdateInfo,
    });
  }
  async deleteZookeeper(zookeeperID: string): Promise<void> {
    await this.zookeeperRepository.softDelete(zookeeperID);
  }
}
