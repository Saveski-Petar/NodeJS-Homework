import { Module } from "@nestjs/common";

import { UserModule } from "./user/user.module";
import { OwnerModule } from "./owner/owner.module";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { AnimalsModule } from "./animals/animals.module";
import { ZookeepersModule } from "./zookeepers/zookeepers.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get("POSTGRES_HOST"),
          port: configService.get("POSTGRES_PORT"),
          username: configService.get("POSTGRES_USER"),
          password: configService.get("POSTGRES_PASSWORD"),
          database: configService.get("POSTGRES_DB"),
          // Be careful with sync because it can break your database
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    OwnerModule,
    ZookeepersModule,
    AnimalsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
