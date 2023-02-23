import { ApiProperty } from "@nestjs/swagger";

export class UpdateVehicleDTO {
    @ApiProperty()
    brand: string;
    
    @ApiProperty()
    model: string;
    
    @ApiProperty()
    color: string;
    
    @ApiProperty()
    sign_code: string;
    
    @ApiProperty()
    type: string;
}