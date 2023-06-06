import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRegisterDto, UserResponseDto } from "src/user/dtos/user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ZookeepersService } from "src/zookeepers/zookeepers.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly zookeeperService: ZookeepersService,
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

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findUserByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(`Invalid credentials`);
      }
      return user;
    }

    if (!user) {
      const zookeeper = await this.zookeeperService.findZookeeperByEmail(email);

      if (zookeeper) {
        const isPasswordValid = await bcrypt.compare(
          password,
          zookeeper.password,
        );
        if (!isPasswordValid) {
          throw new UnauthorizedException(`Invalid credentials`);
        }
        return zookeeper;
      }
    }

    throw new UnauthorizedException(`Invalid credentials`);
  }

  generateAccessToken(user: UserResponseDto): string {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      fullName: user.fullName,
    };
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(user: UserResponseDto): string {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload, {
      expiresIn: "1h",
      issuer: "refresh",
      secret: this.configService.get<string>("RF_TOKEN"), // Use the refresh token secret
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    // Verify the validity of the refresh token

    const decodedToken = this.jwtService.verify(refreshToken, {
      issuer: "refresh",
      secret: this.configService.get<string>("RF_TOKEN"),
    });

    // Extract the necessary information from the decoded refresh token
    const { email, sub, role } = decodedToken;

    // Generate a new access token using the extracted information
    const newAccessToken = this.jwtService.sign(
      { email, sub, role },
      { expiresIn: "15s" }, // Set the desired expiration time for the new access token
    );

    return newAccessToken;
  }
}
