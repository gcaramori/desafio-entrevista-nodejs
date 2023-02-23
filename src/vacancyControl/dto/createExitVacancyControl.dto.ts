import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExitVacancyControlDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;
    
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    exitTime: Date;
}