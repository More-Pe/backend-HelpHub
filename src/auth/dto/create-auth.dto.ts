import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsEmail, IsNotEmpty, IsString } from "class-validator";
export class CreateAuthDto {
    @ApiProperty({
        example: 'todorgandia@gmail.com',
        description: 'email',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'asdasdsadada',
        description: 'password',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
