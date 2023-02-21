import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        private jwtService: JwtService
    ) {}

    async getToken(email: string) {
        const validEmails = [
            'testuser@test.com'
        ];
        
        if(validEmails.find(validEmail => validEmail === email)) {
            return {
                access_token: this.jwtService.sign(email)
            }
        }
        else {
            throw new HttpException('User is not valid!', HttpStatus.UNAUTHORIZED);
        }
    }
}