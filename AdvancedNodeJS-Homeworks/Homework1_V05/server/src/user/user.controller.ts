import { UserService } from "src/user/user.service";
import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AddEmployeeParamsDto } from "./dtos/employee.param.dto";
import { Roles } from "src/auth/decorators/role.decorator";
import { RolesEnum } from "src/auth/role.enum";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { UserResponseDto } from "./dtos/user.dto";

@ApiTags("User")
@ApiBearerAuth()
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(RolesEnum.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id/role/:role")
  addEmployee(@Param() { id, role }: AddEmployeeParamsDto) {
    return this.userService.addEmployee(id, role);
  }

  @Roles(RolesEnum.owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getUsers(): Promise<UserResponseDto[]> {
    return this.userService.getUsers();
  }
}
