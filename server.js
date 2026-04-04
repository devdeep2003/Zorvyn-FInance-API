import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authrouter from './routes/auth.routes.js';
import userRouter from './routes/users.route.js';
import cookieParser from 'cookie-parser';
import recordRouter from './routes/records.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import insightrouter from './routes/insights.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//route middlewares
app.use("/api/auth" , authrouter);
app.use("/api/users" , userRouter);
app.use("/api/records" , recordRouter);
app.use("/api/dashboard" , dashboardRouter)
app.use("/api/insights" , insightrouter);

const port = 4000;

app.get("/" , (req,res)=>{
    res.send("Finance API built for screening round for Zorvyn")
})

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
})
