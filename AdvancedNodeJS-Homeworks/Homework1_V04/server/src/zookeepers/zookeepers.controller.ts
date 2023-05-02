import { ZookeepersService } from './zookeepers.service';
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
} from './dtos/zookeeper.dto';
import { ZookeeperQueryDto } from './dtos/zookeeper-query.dto';
import { ValidatePromise } from 'class-validator';

@ApiTags('Zookeepers')
@Controller('zookeepers')
export class ZookeepersController {
  constructor(private readonly zookeepersService: ZookeepersService) {}

  @Get()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'The found Zookeepers',
  })
  getZookeepers(
    @Query() query?: ZookeeperQueryDto,
  ): Promise<ZookeeperResponseDto[]> {
    return this.zookeepersService.getZookeeper(query);
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
    return this.zookeepersService.addZookeeper(zookeeperInfo);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Zookeeper Updated',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Zookeeper has not been updated ',
  })
  updateZookeeper(
    @Body() zookeeperUpdateInfo: ZookeeperUpdateInfo,
    @Param('id') zookeeperID: string,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.updateZookeeper(
      zookeeperID,
      zookeeperUpdateInfo,
    );
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Zookeeper Deleted',
  })
  deleteZookeeper(
    @Param('id') zookeeperID: string,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.deleteZookeeper(zookeeperID);
  }
}
