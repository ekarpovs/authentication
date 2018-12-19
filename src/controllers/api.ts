'use strict';

import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { default as User, UserModel } from '../models/user';

import '../config/passport';
import { JWT_DEV_SECRET } from '../config/secrets';

import jwt from 'jsonwebtoken';

export let postObtainToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {session: false}, (err: Error, user: UserModel, info: IVerifyOptions) => {
    if (err) { return res.status(400); }
    if (!user) {
      return res.status(400).json({id: ''});
    }
    req.logIn(user, (error) => {
      if (error) { return next(error); }
      const { email, password } = req.body;

      const accessToken = jwt.sign({ email, password }, JWT_DEV_SECRET, { expiresIn: '1h' });
      const id = user._id;

      return res.status(200).json({id, accessToken});
    });
  })(req, res, next);
};

export let postVerifyToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', {session: false}, (err: Error, user: UserModel, info: IVerifyOptions) => {
    if (err) { return res.status(500).json(err); }
    if (!user) { return res.status(400).json(info); }
    return res.status(200).json({ name: 'JsonWebToken', message: 'valid token'});
  })(req, res, next);
};
