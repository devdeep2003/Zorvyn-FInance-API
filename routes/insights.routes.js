import Router from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { getMonthlyInsights, getWeeklyInsights } from '../controllers/insights.controller.js';

const insightrouter = Router();

insightrouter.get('/weekly-insights' , authenticateUser , authorize("insights : read"),getWeeklyInsights);
insightrouter.get('/monthly-insights' , authenticateUser , authorize("insights : read"),getMonthlyInsights);

export default insightrouter;