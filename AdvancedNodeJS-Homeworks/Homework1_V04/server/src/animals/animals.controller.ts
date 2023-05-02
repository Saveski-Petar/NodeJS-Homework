import { AnimalsService } from './animals.service';
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
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from './dtos/animal.dto';
import { query } from 'express';
import { AnimalQueryDto } from './dtos/animal-query.dto';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'Animal Added',
  })
  addAnimal(@Body() animalData: AnimalCreateDto): Promise<AnimalResponseDto> {
    return this.animalsService.addAnimal(animalData);
  }

  @Get()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal found',
  })
  getAnimal(@Query() query?: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    return this.animalsService.getAnimal(query);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal found',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Animal not found',
  })
  getAnimalByID(@Param('id') animalID: string): Promise<AnimalResponseDto[]> {
    return this.animalsService.getAnimalByID(animalID);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal updated',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Animal not found',
  })
  updateAnimal(
    @Param('id') animalID: string,
    @Body() animalUpdateInfo: AnimalUpdateDto,
  ): Promise<AnimalResponseDto> {
    return this.animalsService.updateAnimal(animalID, animalUpdateInfo);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal Deleted',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Animal Not found',
  })
  deleteAnimal(@Param('id') animalID: string): Promise<AnimalResponseDto> {
    return this.animalsService.deleteAnimal(animalID);
  }
}
