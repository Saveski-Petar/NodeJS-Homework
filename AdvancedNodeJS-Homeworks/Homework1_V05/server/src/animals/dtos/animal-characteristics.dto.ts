import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { AnimalDanger } from '../interface/animal';

export class AnimalCharacteristics {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: [String],
    required: false,
    description: 'Food of the Animal',
    example: ['honey', 'apple'],
  })
  food?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    required: false,
    description: 'Color of the Animal',
    example: 'Brown',
  })
  color?: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(AnimalDanger)
  @ApiProperty({
    type: String,
    required: true,
    description: 'Danger of the Animal',
    example: AnimalDanger.Harmless,
    default: AnimalDanger.Harmless,
  })
  isDangerous: AnimalDanger = AnimalDanger.Harmless;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    type: Number,
    required: false,
    description: 'Weight of the Animal',
    example: 150,
  })
  weight?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Enclosure of the Animal',
    example: 'Zoo',
  })
  enclosure: string;
}
