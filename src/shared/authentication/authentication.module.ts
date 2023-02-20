import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '300000ms'
            }
        })
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}