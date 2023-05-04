import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { Animal, animalGender } from '../interface/animal';
import { AnimalCharacteristics } from './animal-characteristics.dto';
import { Type } from 'class-transformer';

export class AnimalCreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name cannot be less than 3 characters' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Name of the Animal',
    example: 'Leo',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Type of the Animal',
    example: 'Bear',
  })
  type: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Age of the Animal',
    example: 8,
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Location of the Animal',
    example: 'Macedonia',
  })
  location: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(animalGender)
  @ApiProperty({
    type: 'enum',
    enum: animalGender,
    required: true,
    description: 'Gender of the Animal',
    example: animalGender.Male,
  })
  gender: animalGender;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    required: false,
    description: 'Zookeeper id ',
    example: 'iuybegu7ithy2t1e',
  })
  zookeeperID?: string;

  @ValidateNested()
  @Type(() => AnimalCharacteristics)
  @ApiProperty({
    description: 'The characteristics of the animal',
    type: () => AnimalCharacteristics,
  })
  characteristics: AnimalCharacteristics;
}

export class AnimalResponseDto extends AnimalCreateDto implements Animal {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID of the Animal',
    example: 'e08ea6f5-4a75-44ed-9a8d-0587d154710d',
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

export class AnimalUpdateDto extends AnimalCreateDto {}
