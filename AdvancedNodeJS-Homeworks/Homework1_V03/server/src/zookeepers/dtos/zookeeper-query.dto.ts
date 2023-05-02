import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ZookeeperStatus } from '../interfaces/zookeeper';

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
    example: 'Johnny',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Status of the Zookeeper',
    example: ZookeeperStatus.active,
  })
  isActive?: string;

  @IsEnum(SortDirection)
  @IsOptional()
  @ApiPropertyOptional({
    type: 'enum',
    enum: SortDirection,
    example: SortDirection.ASC,
    description: 'The sort direction',
  })
  sortDirection?: SortDirection;
}
