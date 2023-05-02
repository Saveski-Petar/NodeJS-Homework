import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Zookeeper, ZookeeperStatus } from '../interfaces/zookeeper';

export class ZookeeperCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(5, { message: 'Name cannot be less than 5 characters' })
  @ApiProperty({
    type: String,
    description: 'Name of the Zookeeper',
    example: 'John',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Age is required' })
  @Min(18, { message: 'You must be at least 18 years old ' })
  @Max(110, {
    message:
      'Sheesh dude you are too old for this,you too old even the Tortoise will get away from you  ',
  })
  @ApiProperty({
    type: Number,
    description: 'Age of the Zookeeper',
    example: 21,
  })
  age: number;

  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  @ApiProperty({
    type: String,
    description: 'Location of the Zookeeper',
    example: 'Macedonia',
  })
  location: string;

  @IsString()
  @IsEnum(ZookeeperStatus)
  @ApiProperty({
    type: 'enum',
    enum: ZookeeperStatus,
    description: 'The status of the Zookeeper',
    example: ZookeeperStatus.active,
    default: ZookeeperStatus.inactive,
  })
  isActive: ZookeeperStatus = ZookeeperStatus.inactive;
}

export class ZookeeperResponseDto
  extends ZookeeperCreateDto
  implements Zookeeper
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID of the zookeeper',
    example: '64367bfe16e1f50f2ab8e2db',
  })
  id: string;
}

export class ZookeeperUpdateInfo extends ZookeeperCreateDto {}
