import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRegisterDto, UserResponseDto } from "src/user/dtos/user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userRegisterData: UserRegisterDto): Promise<UserResponseDto> {
    const hashPassword = await bcrypt.hash(userRegisterData.password, 8);

    return await this.userService.createUser({
      ...userRegisterData,
      password: hashPassword,
    });
  }

  async login(userLoginData: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(
      userLoginData.email,
      userLoginData.password,
    );

    const accessToken = this.jwtService.sign({
      role: user.role,
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    });

    return {
      user,
      accessToken,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findUserByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    return user;
  }
}
