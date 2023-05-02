import { Controller, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimalResponseDto } from 'src/animals/dtos/animals.dto';
import { ZookeeperResponseDto } from 'src/zookeepers/dtos/zookeepers.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete('/animals')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Deleted all animals',
  })
  deleteAllAnimals(): Promise<AnimalResponseDto[]> {
    return this.adminService.deleteAllAnimals();
  }

  @Delete('/zookeepers')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Deleted all Zookeepers',
  })
  deleteAllZookeepers(): Promise<ZookeeperResponseDto[]> {
    return this.adminService.deleteAllZookeepers();
  }
}
