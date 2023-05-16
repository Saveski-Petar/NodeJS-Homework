import { ZookeepersService } from "./zookeepers.service";
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
import {
  ZookeeperCreateDto,
  ZookeeperResponseDto,
  ZookeeperUpdateInfo,
} from "./dtos/zookeeper.dto";
import { ZookeeperQueryDto } from "./dtos/zookeeper-query.dto";
import { Roles } from "../auth/decorators/role.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { RolesEnum } from "src/auth/role.enum";

@ApiTags("Zookeepers")
@ApiBearerAuth()
@Controller("zookeepers")
export class ZookeepersController {
  constructor(private readonly zookeepersService: ZookeepersService) {}

  @Roles(RolesEnum.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "The found Zookeepers",
  })
  getZookeepers(
    @Query() query?: ZookeeperQueryDto,
  ): Promise<ZookeeperResponseDto[]> {
    return this.zookeepersService.getZookeeper(query);
  }

  @Roles(RolesEnum.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: "Zookeeper Added",
  })
  addZookeeper(
    @Body() zookeeperInfo: ZookeeperCreateDto,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.addZookeeper(zookeeperInfo);
  }

  @Roles(RolesEnum.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(":id")
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "Zookeeper Updated",
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "Zookeeper has not been updated ",
  })
  updateZookeeper(
    @Body() zookeeperUpdateInfo: ZookeeperUpdateInfo,
    @Param("id") zookeeperID: string,
  ): Promise<ZookeeperResponseDto> {
    return this.zookeepersService.updateZookeeper(
      zookeeperID,
      zookeeperUpdateInfo,
    );
  }

  @Roles(RolesEnum.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: "Zookeeper Deleted",
  })
  deleteZookeeper(@Param("id") zookeeperID: string): Promise<void> {
    return this.zookeepersService.deleteZookeeper(zookeeperID);
  }
}
