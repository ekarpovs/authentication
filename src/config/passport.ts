import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';

import { default as User } from '../models/user';
import { JWT_DEV_SECRET } from './secrets';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (error: Error, isMatch: boolean) => {
      if (err) { return done(error); }
      if (isMatch) {
        return done(undefined, user);
      }
      return done(undefined, false, { message: 'Invalid email or password.' });
    });
  });
}));

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : JWT_DEV_SECRET},
  (jwtPayload, done) => {
    return done(undefined, jwtPayload);
  // Find the user in db if needed. This functionality may be omitted if
  //  you store everything you'll need in JWT payload.
  // return User.findOne({_id: jwt_payload.sub}, (err, user: any) => {
  //   console.log(jwt_payload.sub);
  //   if (err) { return done(err, false); }
  //   return done(undefined, user);
  // });
}));
