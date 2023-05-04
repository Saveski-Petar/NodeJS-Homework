import { Controller, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete('/deleteAll/zookeepers')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Zookeepers Deleted',
  })
  deleteZookeepers(): Promise<void> {
    return this.adminService.deleteZookeepers();
  }

  @Delete('/deleteAll/animals')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: 'Animals Deleted',
  })
  deleteAnimals(): Promise<void> {
    return this.adminService.deleteAnimals();
  }
}
