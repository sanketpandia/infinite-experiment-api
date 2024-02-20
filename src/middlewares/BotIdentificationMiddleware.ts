import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    isBot?: boolean;
  }
}

@Injectable()
export class BotIdentificationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isBotRequest = req.headers['is-bot'] === 'true'; // Assuming the header contains 'true' for bot requests
    console.log(isBotRequest);
    req.isBot = isBotRequest;
    next();
  }
}
