import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsNotEmpty, IsEnum } from "class-validator";
import { RolesEnum } from "src/auth/role.enum";

export class AddEmployeeParamsDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: `Users ID`,
    required: true,
  })
  id: string;

  @IsEnum(RolesEnum)
  @IsNotEmpty()
  @ApiProperty({
    description: "Users new role",
    enum: RolesEnum,
    required: true,
    default: RolesEnum.user,
  })
  role: RolesEnum;
}
