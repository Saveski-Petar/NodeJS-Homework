import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AnimalQueryDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
    description: 'Location of the animal',
    example: 'Macedonia',
  })
  location?: string;
}
