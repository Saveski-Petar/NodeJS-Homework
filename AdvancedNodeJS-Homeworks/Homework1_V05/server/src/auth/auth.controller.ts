import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserRegisterDto } from "src/user/dtos/user.dto";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signUp")
  signUp(@Body() userRegisterData: UserRegisterDto): Promise<UserRegisterDto> {
    return this.authService.signUp(userRegisterData);
  }

  @Post("/login")
  login(@Body() loginData: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginData);
  }
}
