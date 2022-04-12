import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GatewayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(req.headers['x-gwu-api'] == process.env.API_KEY) return next();
    res.status(400).send({
        status_code: 400,
        message: 'Authentication failed'
    })
  }
}
