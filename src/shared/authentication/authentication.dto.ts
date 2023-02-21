import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDTO {
    @IsString()
    @IsNotEmpty()
    email: string;
}