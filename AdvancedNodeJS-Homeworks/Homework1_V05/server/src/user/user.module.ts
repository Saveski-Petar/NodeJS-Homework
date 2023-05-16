import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { JwtService } from "@nestjs/jwt";
import { ZookeepersModule } from "src/zookeepers/zookeepers.module";

@Module({
  imports: [ZookeepersModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [JwtService, UserService],
  exports: [UserService],
})
export class UserModule {}
