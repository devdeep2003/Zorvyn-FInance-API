import Router from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.middleware.js';
import { authorize } from '../middlewares/authorize.middleware.js';
import { createRecord, deleteRecord, getAllRecords, getFilteredRecords, updateRecord } from '../controllers/records.controller.js';

const recordRouter = Router();

recordRouter.get("/view-records" , authenticateUser , authorize("records : read") , getAllRecords);
recordRouter.post("/create-record" , authenticateUser , authorize("records : create"),createRecord);
recordRouter.patch("/update-record/:r_id" , authenticateUser , authorize("records : update"),updateRecord);
recordRouter.delete("/delete-record/:r_id" , authenticateUser , authorize("records : delete"),deleteRecord);
recordRouter.get("/filtered-records" , authenticateUser , authorize("records : read") , getFilteredRecords);

export default recordRouter;