import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { Logger } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class JwtOpenIdAccess extends PassportStrategy(Strategy, 'jwt-openid-acces') {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    if (!payload.scope || !payload.scope.includes('openid')) {
      throw new UnauthorizedException("Access token is missing 'openid' scope");
    }
    
    return payload;
  }
}