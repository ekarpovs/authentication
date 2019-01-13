'use strict';
import { NextFunction, Request, Response } from 'express';

export let getHome = (req: Request, res: Response, next: NextFunction) => {

  return res.status(200).json('Authentication micro service home page');
};
