import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import userRouter from './routes/userRouter';
import { errorMiddleware } from './middlewares/error';

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());

    app.use('/user', userRouter);

    app.use(errorMiddleware);

    return app.listen(process.env.PORT);

});

