import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { RefreshTokenStrategy } from "./strategy/refreshToken.strategy";
import { ZookeepersModule } from "src/zookeepers/zookeepers.module";
import { AC_TOKEN } from "./auth.const";

@Module({
  imports: [
    UserModule,
    ZookeepersModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: AC_TOKEN,
        signOptions: {
          expiresIn: "7d",
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy], // Include the RefreshTokenStrategy
  exports: [AuthService],
})
export class AuthModule {}
