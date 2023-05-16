import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from './dtos/animal.dto';
import { query } from 'express';
import { AnimalQueryDto } from './dtos/animal-query.dto';
import { ValidatePromise } from 'class-validator';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalService: AnimalsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal Added',
  })
  addAnimal(@Body() animalData: AnimalCreateDto): Promise<AnimalResponseDto> {
    return this.animalService.addAnimal(animalData);
  }

  @Get()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animals Found',
  })
  getAnimals(@Query() query?: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    return this.animalService.getAnimals(query);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal Found',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Animal Not Found',
  })
  getAnimalByID(@Param('id') animalID: string): Promise<AnimalResponseDto> {
    return this.animalService.getAnimalByID(animalID);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal Updated',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Animal Not Found',
  })
  updateAnimal(
    @Param('id') animalID: string,
    @Body() animalUpdatedInfo: AnimalUpdateDto,
  ): Promise<AnimalResponseDto> {
    return this.animalService.updateAnimal(animalID, animalUpdatedInfo);
  }

  @Patch(':animalID/zookeeper/:zookeeperID')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal Added',
  })
  addZookeeperToAnimal(
    @Param('animalID') animalID: string,
    @Param('zookeeperID') zookeeperID: string,
  ) {
    return this.animalService.addZookeeperToAnimal(animalID, zookeeperID);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal deleted',
  })
  deleteAnimal(@Param('id') animalID: string): Promise<void> {
    return this.animalService.deleteAnimal(animalID);
  }
}
