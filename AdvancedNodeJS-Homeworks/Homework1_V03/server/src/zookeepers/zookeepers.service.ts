/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ZookeeperCreateDto,
  ZookeeperResponseDto,
  ZookeeperUpdateInfo,
} from './dtos/zookeepers.dto';
import { Zookeeper } from './interfaces/zookeeper';
import { Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { ZookeeperQueryDto } from './dtos/zookeeper-query.dto';

@Injectable()
export class ZookeepersService {
  constructor(
    @Inject('ZOOKEEPER_MODEL') private zookeeperModel: Model<Zookeeper>,
    private readonly logger: PinoLogger,
  ) {}

  async getZookeeper(
    query?: ZookeeperQueryDto,
  ): Promise<ZookeeperResponseDto[]> {
    this.logger.info('getZookeepers called');
    const zookeeper = await this.zookeeperModel.find({});

    if (zookeeper.length === 0)
      throw new NotFoundException(`There  are 0  zookeepers in Database`);

    if (query) {
      if (query.name) {
        return await this.zookeeperModel
          .find({ name: query.name })
          .populate('Animals', '-zookeeper');
      }
      if (query.isActive) {
        return await this.zookeeperModel.find({ isActive: query.isActive });
      }
    }

    return zookeeper;
  }

  async addZookeeper(
    zookeeperInfo: ZookeeperCreateDto,
  ): Promise<ZookeeperResponseDto> {
    return await this.zookeeperModel.create(zookeeperInfo);
  }

  async updateZookeeper(
    ID: string,
    zookeeperUpdateInfo: ZookeeperUpdateInfo,
  ): Promise<ZookeeperResponseDto> {
    const zookeeper = await this.zookeeperModel.findById(ID);

    if (!zookeeper)
      throw new NotFoundException(`The zookeeper with the ${ID} is not found`);

    return this.zookeeperModel.findByIdAndUpdate(ID, zookeeperUpdateInfo, {
      new: true,
      runValidators: true,
    });
  }

  async deleteZookeeper(ID: string): Promise<ZookeeperResponseDto> {
    return this.zookeeperModel.findByIdAndDelete(ID);
  }
}
