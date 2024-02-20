import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RequestType } from 'src/enums/request-type.enum';

declare module 'express-serve-static-core' {
  interface Request {
    isBot?: boolean;
  }
}

@Injectable()
export class BotIdentificationMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const isBotRequest = req.headers['x-request-type'] === RequestType.BOT;
    const apiKey = req.headers['x-bot-token'] as string;
    if (isBotRequest) {
      if (!apiKey || !this.authService.validateApiKey(apiKey)) {
        throw new UnauthorizedException('Unauthorized');
      }
    }

    next();
  }
}
