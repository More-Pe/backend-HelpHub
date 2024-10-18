import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsEmail, IsNotEmpty, IsString, IsBoolean, Matches, IsOptional, MinLength } from "class-validator";

export class CreateHabilityDto {
    @ApiProperty({
        example: 'Programador',
        description: 'title of hability',
        format: 'string',
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'Básico',
        description: 'level of knowledge',
        format: 'string',
    })
    @IsNotEmpty()
    level: string;

    @ApiProperty({
        example: 'Online',
        description: 'Online/Presential',
        format: 'string',
    })
    @IsNotEmpty()
    mode: string;

    @ApiProperty({
        example: 'doing c++',
        description: 'hability described',
        format: 'string',
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 'IT',
        description: 'category',
        format: 'string',
    })
    @IsNotEmpty()
    category: string;
}
