import {
  IsNumber,
  Min,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsObject,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Animal, AnimalDenger, AnimalGender } from '../interfaces/animals';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

class AnimalCharacteristics {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    description: 'Food for the Animal',
    example: ['honey', 'apple'],
  })
  food?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Color of the Animal',
    example: 'brown',
  })
  color?: string;

  @IsString()
  @IsEnum(AnimalDenger)
  @IsNotEmpty({ message: 'Danger status is required' })
  @ApiProperty({
    type: 'enum',
    enum: AnimalDenger,
    description: 'The danger status of the Animal',
    example: AnimalDenger.Harmless,
  })
  isDangerous: AnimalDenger = AnimalDenger.Harmless;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'Weight of the Animal in kg',
    example: 200,
  })
  weight?: number;

  @IsString()
  @IsNotEmpty({ message: 'Enclosure is required' })
  @ApiProperty({
    type: String,
    description: 'Enclosure where the Animal is kept',
    example: 'zoo',
  })
  enclosure: string;
}

export class AnimalCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name cannot be less than 3 characters' })
  @ApiProperty({
    type: String,
    description: 'Name of the Animal',
    example: 'Leo',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The type of the animal',
    example: 'Bear',
  })
  type: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Age is required' })
  @Min(0)
  @ApiProperty({
    type: Number,
    description: 'Age of the animal',
    example: 4,
  })
  age: number;

  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  @ApiProperty({
    type: String,
    description: 'Location of the Animal',
    example: 'Macedonia',
  })
  location: string;

  @IsString()
  @IsNotEmpty({ message: 'Gender   is required' })
  @IsEnum(AnimalGender)
  @ApiProperty({
    type: 'enum',
    enum: AnimalGender,
    description: 'The Gender of the Animal',
    example: AnimalGender.Male,
  })
  gender: AnimalGender;

  @IsObject()
  @IsNotEmpty({ message: 'Some of the characteristics are required' })
  @ApiProperty({
    type: Object,
    description: 'Characteristics of the Animal',
    example: {
      food: ['honey', 'apple', 'watermelon', 'cucumber'],
      color: 'brown',
      isDangerous: AnimalDenger.Harmless,
      weight: 200,
      enclosure: 'zoo',
    },
  })
  characteristics: AnimalCharacteristics;
}

export class AnimalResponseDto extends AnimalCreateDto implements Animal {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID of the Animal',
    example: '64367bfe16e1f50f2ab8e2db',
  })
  id: string;
}

export class AnimalUpdateDto extends AnimalCreateDto {}
