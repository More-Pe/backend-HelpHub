import { ApiProperty } from "@nestjs/swagger";
import {  IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
export class CreateAuthDto {
    @ApiProperty({
        example: 'todorgandia@gmail.com',
        description: 'email',
        format: 'string',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'asdasdsadada',
        description: 'password',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password should be min 6 digits.' })
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password should contain mínimum one Mayusc, one number, and one symbol',
  })
    password: string;
}
