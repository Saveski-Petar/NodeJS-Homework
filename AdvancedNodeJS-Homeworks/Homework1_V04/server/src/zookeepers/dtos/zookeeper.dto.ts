import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Zookeeper, ZookeeperStatus } from '../interfaces/zookeeper.interface';

export class ZookeeperCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(5, { message: 'Name cannot be less than 5 characters' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Name of the Zookeeper',
    example: 'Johnny',
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
  @IsNotEmpty()
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
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID of the zookeeper',
    example: '64367bfe16e1f50f2ab8e2db',
  })
  id: string;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'Date and time when player has been created',
    example: '2023-05-02T18:24:24.713Z',
  })
  createdAt!: Date;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'Date and time when player has been updated',
    example: '2023-05-02T18:24:24.713Z',
  })
  updatedAt!: Date;

  @ApiPropertyOptional({
    type: Date,
    required: false,
    description: 'Date and time when player has been deleted',
    example: '2023-05-02T18:24:24.713Z',
  })
  deletedAt?: Date;
}

export class ZookeeperUpdateInfo extends ZookeeperCreateDto {}
