import { Module } from "@nestjs/common";
import { ZookeepersController } from "./zookeepers.controller";
import { ZookeepersService } from "./zookeepers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Zookeeper } from "./zookeepers.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Zookeeper])],
  controllers: [ZookeepersController],
  providers: [JwtService, ZookeepersService],
  exports: [ZookeepersService],
})
export class ZookeepersModule {}
