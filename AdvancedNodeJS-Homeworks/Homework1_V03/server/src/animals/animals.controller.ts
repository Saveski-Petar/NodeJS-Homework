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
import { AnimalsService } from './animals.service';
import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from './dtos/animals.dto';
import { AnimalQueryDto } from './dtos/animal-query.Dto';

@ApiTags('Animal')
@Controller('/animals')
export class AnimalsController {
  constructor(private readonly animalService: AnimalsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'Animal added to the zoo',
  })
  addAnimal(@Body() animalData: AnimalCreateDto): Promise<AnimalResponseDto> {
    return this.animalService.addAnimal(animalData);
  }

  @Get()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animals found',
  })
  getAnimals(@Query() query: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    return this.animalService.getAnimals(query);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animal Found',
  })
  getAnimal(@Param('id') animalID: string): Promise<AnimalResponseDto> {
    return this.animalService.getAnimalByID(animalID);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Edited animal',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'ANimal not found',
  })
  updateAnimal(
    @Body() updateAnimalData: AnimalUpdateDto,
    @Param('id') animalID: string,
  ): Promise<AnimalResponseDto> {
    return this.animalService.updateAnimal(animalID, updateAnimalData);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Delited animal',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'ANimal not found',
  })
  deleteAnimal(@Param('id') animalID: string): Promise<AnimalResponseDto> {
    return this.animalService.deleteAnimal(animalID);
  }
}
