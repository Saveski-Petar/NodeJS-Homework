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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AnimalsService } from "./animals.service";
import {
  AnimalCreateDto,
  AnimalResponseDto,
  AnimalUpdateDto,
} from "./dtos/animal.dto";
import { AnimalQueryDto } from "./dtos/animal-query.dto";
import { Roles } from "src/auth/decorators/role.decorator";
import { RolesEnum } from "src/auth/role.enum";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/guards/role.guard";

@ApiTags("Animals")
@ApiBearerAuth()
@Controller("animals")
export class AnimalsController {
  constructor(private readonly animalService: AnimalsService) {}

  @Roles(RolesEnum.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "Animal Added",
  })
  addAnimal(@Body() animalData: AnimalCreateDto): Promise<AnimalResponseDto> {
    return this.animalService.addAnimal(animalData);
  }

  @Roles(RolesEnum.owner, RolesEnum.zookeeper, RolesEnum.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "Animals Found",
  })
  getAnimals(@Query() query?: AnimalQueryDto): Promise<AnimalResponseDto[]> {
    return this.animalService.getAnimals(query);
  }

  @Roles(RolesEnum.owner, RolesEnum.zookeeper)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":id")
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "Animal Found",
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "Animal Not Found",
  })
  getAnimalByID(@Param("id") animalID: string): Promise<AnimalResponseDto> {
    console.log("Animal ID ID iD", animalID);

    return this.animalService.getAnimalByID(animalID);
  }

  @Roles(RolesEnum.owner, RolesEnum.zookeeper)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(":id")
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "Animal Updated",
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "Animal Not Found",
  })
  updateAnimal(
    @Param("id") animalID: string,
    @Body() animalUpdatedInfo: AnimalUpdateDto,
  ): Promise<AnimalResponseDto> {
    return this.animalService.updateAnimal(animalID, animalUpdatedInfo);
  }

  @Roles(RolesEnum.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":animalID/zookeeper/:zookeeperID")
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "Animal Added",
  })
  addZookeeperToAnimal(
    @Param("animalID") animalID: string,
    @Param("zookeeperID") zookeeperID: string,
  ) {
    return this.animalService.addZookeeperToAnimal(animalID, zookeeperID);
  }
  @Roles(RolesEnum.owner, RolesEnum.zookeeper)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "Animal deleted",
  })
  softDeleteAnimal(@Param("id") animalID: string): Promise<void> {
    return this.animalService.softDeleteAnimal(animalID);
  }

  @Roles(RolesEnum.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "Animal deleted",
  })
  hardDeleteAnimal(@Param("id") animalID: string): Promise<void> {
    return this.animalService.hardDeleteAnimal(animalID);
  }
}
