import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthDTO } from './authentication.dto';

@Controller('/api/v1/auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}
    
    @Post()
    async grantAuthentication(@Body() email: CreateAuthDTO) {
        return this.authenticationService.getToken(email.email);
    }
}