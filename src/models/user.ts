import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const SALT_WORK_FACTOR = 10;

export type UserModel = mongoose.Document & {
  email: string,
  password: string,
  comparePassword: comparePasswordFunction,
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export interface IAuthToken  {
  accessToken: string;
  kind: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = userSchema.statics;
  if (!this.isModified('password')) { return next(); }
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (error: mongoose.Error, hash) => {
      if (err) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

userSchema.methods.comparePassword = comparePassword;

const User = mongoose.model('User', userSchema);
export default User;
