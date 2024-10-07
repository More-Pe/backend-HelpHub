import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsEmail, IsNotEmpty, IsString, IsBoolean } from "class-validator";
export class CreateUserDto {
    @ApiProperty({
        example: 'too@gmail.com',
        description: 'username',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'fffD33454',
        description: 'password',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: 'Toni',
        description: 'name',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    nameUser: string;

    @ApiProperty({
        example: 'Fernandez',
        description: 'surname',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    surnameUser: string;

    @ApiProperty({
        example: '123456',
        description: 'phoneNumber',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        example: 'false',
        description: 'optionCall',
        format: 'string',
    })
    @IsBoolean()
    optionCall: boolean;

    @ApiProperty({
        example: 'false',
        description: 'optionPhone',
        format: 'string',
    })
    @IsBoolean()
    showPhone: boolean;
}
