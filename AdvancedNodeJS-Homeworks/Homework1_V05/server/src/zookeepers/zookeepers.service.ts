import { Repository } from "typeorm";
import { Zookeeper } from "./zookeepers.entity";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import {
  ZookeeperCreateDto,
  ZookeeperResponseDto,
  ZookeeperUpdateInfo,
} from "./dtos/zookeeper.dto";
import { ZookeeperQueryDto } from "./dtos/zookeeper-query.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ZookeepersService {
  constructor(
    @InjectRepository(Zookeeper)
    private zookeeperRepository: Repository<Zookeeper>,
  ) {}

  async getZookeeper(
    query?: ZookeeperQueryDto,
  ): Promise<ZookeeperResponseDto[]> {
    const zookeeper = await this.zookeeperRepository.find({
      relations: ["animals"],
    });

    if (zookeeper.length === 0)
      throw new NotFoundException(`There  are 0  zookeepers in Database`);

    if (query) {
      if (query.fullName) {
        const zookeepersByName = await this.zookeeperRepository
          .createQueryBuilder("zookeeper")
          .leftJoinAndSelect("zookeeper.animals", "animals")
          .where("zookeeper.fullName ILIKE :fullName", {
            fullName: `%${query.fullName}%`,
          })
          .getMany();

        if (zookeepersByName.length === 0)
          throw new NotFoundException(
            "There are no found zookeepers with that name ",
          );

        return zookeepersByName;
      }
      if (query.isActive) {
        const zookeepersByActiveStatus = await this.zookeeperRepository
          .createQueryBuilder("zookeeper")
          .where("zookeeper.isActive = :isActive", {
            isActive: query.isActive,
          })
          .getMany();

        if (zookeepersByActiveStatus.length === 0)
          throw new NotFoundException(
            `There are no found zookeepers with ${query.isActive} status `,
          );

        return zookeepersByActiveStatus;
      }
    }

    return zookeeper;
  }
  async findZookeeperByEmail(
    email: string,
  ): Promise<ZookeeperResponseDto | null> {
    const zookeeper = await this.zookeeperRepository.findOne({
      where: { email },
    });

    if (!zookeeper) return null;

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
