import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
} from "class-validator";
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from "src/app.utils";
import { UserResponseDto } from "src/user/dtos/user.dto";

export class LoginDto {
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
}

export class LoginResponseDto {
  @ApiProperty({
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @ApiProperty({
    type: String,
    required: true,
    description: "JWT token",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  })
  accessToken: string;
}
