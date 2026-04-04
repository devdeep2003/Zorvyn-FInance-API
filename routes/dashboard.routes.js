import Router from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { getCategoryWiseTotals, getNetBalance, getRecentActivity, getTotalExpense, getTotalIncome } from '../controllers/dashboard.controller.js';


const dashboardRouter = Router();

dashboardRouter.get("/total-income" , authenticateUser , authorize("dashboard : read"),getTotalIncome);
dashboardRouter.get("/total-expense" , authenticateUser , authorize("dashboard : read") , getTotalExpense);
dashboardRouter.get("/net-balance" , authenticateUser , authorize("dashboard : read"),getNetBalance);
dashboardRouter.get("/category-wise-totals" , authenticateUser , authorize("dashboard : read"),getCategoryWiseTotals );
dashboardRouter.get("/recent-activity" , authenticateUser , authorize("dashboard : read"), getRecentActivity);

export default dashboardRouter;
