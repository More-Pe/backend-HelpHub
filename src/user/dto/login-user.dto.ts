import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsEmail, IsNotEmpty, IsString, IsBoolean, Matches, IsOptional } from "class-validator";
export class LoginUserDto {
    @ApiProperty({
        example: 'too@gmail.com',
        description: 'username',
        format: 'string',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '444333',
        description: 'twoFa',
        format: 'string',
    })
    @Matches(/^\d{6}$/, { message: 'The code must be exactly 6 digits long' })
    @IsString()
    twoFa: string;

}