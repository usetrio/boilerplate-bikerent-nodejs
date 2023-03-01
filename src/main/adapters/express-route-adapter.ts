import { Controller, HttpRequest } from '@/presentation/controllers/ports';
import { Request, Response } from 'express';

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      token: req.headers.authorization,
      body: req.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
