import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;
}