import axios from 'axios';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express-serve-static-core';
import { notAvailable, unauthorized } from '../../@core/infra/protocols/http';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
    try {
      const bearerToken = request.headers.authorization?.split(' ')[1]!;

      const urlEncoded = new URLSearchParams({
        token: bearerToken,
        client_secret: process.env.SSO_CLIENT_SECRET!,
        username: process.env.SSO_CLIENT_USERNAME!,
        client_id: process.env.SSO_CLIENT_ID!,
      }).toString();

      const SSO_URL = process.env.SSO_HOST!;

      const { data } = await axios.post(SSO_URL, urlEncoded, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });

      if (!data?.active) {
        return response.status(unauthorized().statusCode).json(unauthorized);
      }

      return next();
    } catch (error) {
      return response
        .status(notAvailable().statusCode)
        .json(notAvailable(`SSO not available: ${error}`).body);
    }
  }
}
