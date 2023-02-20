import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStoreDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    telephone: string;

    @IsNumber()
    @IsNotEmpty()
    qtyCars: number;
    
    @IsNumber()
    @IsNotEmpty()
    qtyMotorcicles: number;
}