import { Application } from 'express';

// Controllers (route handlers)
import * as apiController from '../controllers/api';

const setRoutes = (app: Application) => {
  app.post('/token/obtain', apiController.postObtainToken);
  app.post('/token/verify', apiController.postVerifyToken);
};

export default setRoutes;
