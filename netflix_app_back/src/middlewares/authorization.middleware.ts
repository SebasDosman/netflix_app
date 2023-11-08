import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { NextFunction } from "express";

import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { AuthService } from "src/modules/auth/service/auth.service";


@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService
    ) { }

    async use(req: any, res: any, next: NextFunction ) {
        const authorizationToken = req.headers['authorization'];

        if (!authorizationToken) throw new UnauthorizedException('There is no bearer token');

        const token = authorizationToken.split(' ')['1'];

        const payload = await this.jwtService.verifyAsync<JwtPayload>(
            token, { secret: process.env.JWT_SECRET_KEY }
        )

        const user = await this.authService.findUserById(payload.id);
        
        if (!user.roles.includes("admin")) throw new UnauthorizedException("You are not authorized"); 
        
        next(); 
    }
}