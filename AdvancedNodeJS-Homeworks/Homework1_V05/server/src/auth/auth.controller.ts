import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserRegisterDto, UserResponseDto } from "src/user/dtos/user.dto";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-Token.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() userRegisterData: UserRegisterDto): Promise<UserResponseDto> {
    return this.authService.signUp(userRegisterData);
  }

  @Post("/login")
  login(@Body() loginData: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginData);
  }

  @Post("/refreshToken")
  async refreshToken(
    @Body("refreshToken") refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.refreshAccessToken(refreshToken);

    return {
      accessToken: accessToken,
    };
  }
}
