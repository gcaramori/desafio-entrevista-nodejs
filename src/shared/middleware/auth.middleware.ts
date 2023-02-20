import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    private jwtService: JwtService;

    constructor() {
        this.jwtService = new JwtService;
    }

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            throw new HttpException('JWT Token is missing!', HttpStatus.UNAUTHORIZED);
        }

        const token = authHeader.split('Bearer ')[1];

        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

            return next();
        }
        catch(err) {
            throw new HttpException('Invalid JWT Token!', HttpStatus.UNAUTHORIZED);
        }
    }
}