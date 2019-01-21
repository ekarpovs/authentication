import bluebird from 'bluebird';
import mongoose from 'mongoose';

import { MONGODB_URI } from '../config/environment';

const connectToMongoDb = () => {
  const mongoUrl = MONGODB_URI;
  (mongoose as any).Promise = bluebird;
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(mongoUrl).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  ).catch((error) => {
    // tslint:disable-next-line:no-console
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
    process.exit();
  });
};

export default connectToMongoDb;
