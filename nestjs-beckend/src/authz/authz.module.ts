import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtM2MStrategy } from './jwt-m2m-authz.strategy';
import { JwtOpenIdAccess } from './jwt-openid-acces.strategy';

@Module({
    imports: [PassportModule],
    providers: [JwtM2MStrategy, JwtOpenIdAccess],
    exports: [PassportModule],
})
export class AuthzModule { }
