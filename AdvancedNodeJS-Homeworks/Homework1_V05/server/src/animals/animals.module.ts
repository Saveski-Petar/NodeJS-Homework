import { Module } from "@nestjs/common";
import { AnimalsController } from "./animals.controller";
import { AnimalsService } from "./animals.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Animal } from "./animal.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
