import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  Min,
  MinLength,
} from "class-validator";
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from "../../app.utils";
import { IsPassowrdMatch } from "src/common/validators/Is_Passwords_Matching.validator";
import { Exclude } from "class-transformer";
import { RolesEnum } from "../../auth/role.enum";

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    type: String,
    required: true,
    description: "Full Name of the User",
    example: "John Doe",
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: true,
    uniqueItems: true,
    description: "Email of the user",
    example: "JohnDoe@mail.com",
  })
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(18)
  @Max(49)
  @ApiProperty({
    type: Number,
    required: true,
    description: "Age of the user",
    example: 28,
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: "Location of the user",
    example: "Macedonia",
  })
  location: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(PASSWORD_RULE, { message: PASSWORD_RULE_MESSAGE })
  @ApiProperty({
    type: String,
    required: true,
    description: "password of the user account",
    example: "Password123",
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 24)
  @IsPassowrdMatch<UserRegisterDto>("password")
  @Matches(PASSWORD_RULE, { message: PASSWORD_RULE_MESSAGE })
  @Exclude({ toPlainOnly: true })
  @ApiProperty({
    type: String,
    required: true,
    description: "Confirm password of the user account",
    example: "Password123",
  })
  confirmPassword: string;
}

export class UserResponseDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    type: String,
    description: `Users ID`,
    required: true,
    example: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  })
  id: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    type: String,
    required: true,
    description: "Full Name of the User",
    example: "John Doe",
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: true,
    uniqueItems: true,
    description: "Email of the user",
    example: "JohnDoe@mail.com",
  })
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(18)
  @Max(49)
  @ApiProperty({
    type: Number,
    required: true,
    description: "Age of the user",
    example: 28,
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: "Location of the user",
    example: "Macedonia",
  })
  location: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(PASSWORD_RULE, { message: PASSWORD_RULE_MESSAGE })
  @ApiProperty({
    type: String,
    required: true,
    description: "password of the user account",
    example: "Password123",
  })
  password: string;

  @IsEnum(RolesEnum)
  @ApiProperty({
    type: "enum",
    enum: RolesEnum,
    description: `Role of the user`,
    required: true,
    example: RolesEnum.user,
    default: RolesEnum.user,
  })
  role: RolesEnum;

  @ApiProperty({
    type: Date,
    required: true,
    description: "Date and time when User has been created",
    example: "2023-05-02T18:24:24.713Z",
  })
  createdAt!: Date;

  @ApiProperty({
    type: Date,
    required: true,
    description: "Date and time when User has been updated",
    example: "2023-05-02T18:24:24.713Z",
  })
  updatedAt!: Date;

  @ApiPropertyOptional({
    type: Date,
    required: false,
    description: "Date and time when User has been deleted",
    example: "2023-05-02T18:24:24.713Z",
  })
  deletedAt?: Date;
}
