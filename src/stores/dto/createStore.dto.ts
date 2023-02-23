import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    telephone: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    qtyCars: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    qtyMotorcicles: number;
}