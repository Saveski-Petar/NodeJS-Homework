/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ZookeeperCreateDto,
  ZookeeperResponseDto,
  ZookeeperUpdateInfo,
} from './dtos/zookeepers.dto';
import { ZookeepersService } from './zookeepers.service';
import { ZookeeperQueryDto } from './dtos/zookeeper-query.dto';

@ApiTags('Zookeepers')
@Controller('/zookeepers')
export class ZookeepersController {
  constructor(private readonly zookeeperService: ZookeepersService) {}
  @Get()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'The found Zookeepers',
  })
  getZookeepers(
    @Query() query: ZookeeperQueryDto,
  ): Promise<ZookeeperResponseDto[]> {
    return this.zookeeperService.getZookeeper(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'Zookeeper Added',
  })
  addZookeeper(
    @Body() zookeeperInfo: ZookeeperCreateDto,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeeperService.addZookeeper(zookeeperInfo);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Zookeeper edited',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Zookeeper has not been found',
  })
  updateZookeeper(
    @Param('id') id: string,
    @Body() updateZookeeperInfo: ZookeeperUpdateInfo,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeeperService.updateZookeeper(id, updateZookeeperInfo);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Zookeeper Deleted',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Zookeeper has not been found',
  })
  deleteZookeeper(@Param('id') id: string): Promise<ZookeeperResponseDto> {
    return this.zookeeperService.deleteZookeeper(id);
  }
}
