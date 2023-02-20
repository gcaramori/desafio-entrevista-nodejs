import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        private jwtService: JwtService
    ) {}

    async getToken(email: string) {
        const validEmails = [
            'testuser@test.com',
        ];

        if(validEmails.find(emails => email)) {
            return {
                access_token: this.jwtService.sign(email)
            }
        }
        else {
            throw Error('User is not valid!');
        }
    }
}