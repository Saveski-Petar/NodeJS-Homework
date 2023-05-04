import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ZookeeperStatus } from '../interfaces/zookeeper.interface';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class ZookeeperQueryDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Name of the Zookeeper',
    required: false,
    example: 'Johnny',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
    description: 'Status of the Zookeeper',
    example: ZookeeperStatus.active,
  })
  isActive?: string;

 
}
