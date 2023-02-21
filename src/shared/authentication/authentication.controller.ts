import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

interface emailParam {
    email: string;
}

@Controller('/api/v1/auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}
    
    @Post()
    async grantAuthentication(@Body() email: emailParam) {
        return this.authenticationService.getToken(email.email);
    }
}