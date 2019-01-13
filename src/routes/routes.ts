import { Application } from 'express';

// Controllers (route handlers)
import * as apiController from '../controllers/api';
import * as homeController from '../controllers/home';

const setRoutes = (app: Application) => {
  app.get('/', homeController.getHome);
  app.post('/token/obtain', apiController.postObtainToken);
  app.post('/token/verify', apiController.postVerifyToken);
};

export default setRoutes;
