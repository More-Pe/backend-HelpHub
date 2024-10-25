import {  ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class CreateUploadServiceDto {
    @ApiProperty({
        example: '1231321dwdf13',
        description: 'ID of user',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    id_user: string;

    @ApiProperty({
        format: 'binary' //file
    })
    image_profile:string;

}
