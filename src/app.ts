import express from 'express';

import expressConfig from './config/express';
import connectToMongoDb from './db/mongoose';
import setRoutes from './routes/routes';
// import logger from './utils/logger';

// Connect to data base
connectToMongoDb();

// Create Express server
const app = express();

// Express configuration
expressConfig(app);

// Define API routes.
setRoutes(app);

export default app;
