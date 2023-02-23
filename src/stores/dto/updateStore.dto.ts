import { ApiProperty } from "@nestjs/swagger";

export class UpdateStoreDTO {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    cnpj: string;
    
    @ApiProperty()
    address: string;
    
    @ApiProperty()
    telephone: string;
    
    @ApiProperty()
    qtyCars: number;
    
    @ApiProperty()
    qtyMotorcicles: number;
}