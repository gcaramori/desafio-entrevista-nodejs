import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('/api/v1/auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}
    
    @Post()
    async grantAuthentication(@Body() email: string) {
        return this.authenticationService.getToken(email);
    }
}