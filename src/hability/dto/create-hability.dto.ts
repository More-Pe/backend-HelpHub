import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { Level, Mode } from "../entities/hability.schema";

export class CreateHabilityDto {
    @ApiProperty({
        example: 'Programador',
        description: 'title of hability',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'basic',
        description: 'level of knowledge',
        format: 'string',
    })
    @IsEnum(Level)
    @IsNotEmpty()
    level: Level;

    @ApiProperty({
        example: 'online',
        description: 'Online/Presential',
        format: 'string',
    })
    @IsEnum(Mode)
    @IsNotEmpty()
    mode: Mode;

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
