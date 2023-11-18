import { Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import HttpException from '../exceptions/HttpException';

export class IsBodyNotEmptyMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, _response: Response, next: (err?: any) => any): any {
    if (!Object.keys(request.body).length)
      throw new HttpException(400, 'Request body should not be empty');
    next();
  }
}
