import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEntryVacancyControlDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;
    
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    entryTime: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    vehicleId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    storeId: string;
}