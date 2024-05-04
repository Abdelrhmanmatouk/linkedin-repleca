import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './DB/connection.js';
import userRouter from './src/modules/users/user.router.js';
import companyRouter from './src/modules/companies/company.router.js';
import jobRouter from './src/modules/jobs/job.router.js';
import bonusRouter from './src/modules/bonus/bonus.router.js';
import cors from 'cors'

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());
await connectDB();

// APIs

// user APIs
app.use('/users', userRouter);

// company APIs

app.use('/company', companyRouter);

// jobs APIs

app.use('/job', jobRouter);

// bonus API
app.use('/bonus',bonusRouter)


app.use('*', (req, res, next) => {
  return new Error('page not found', { cause: 404 });
});

// global error handling

app.use((error, req, res, next) => {
  return res.json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, () => console.log(`App is listening on port ${port}!`));
