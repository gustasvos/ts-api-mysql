import express, { Express } from 'express';
import { AppDataSource } from './data-source';
import userRouter from './routes/userRouter';

AppDataSource.initialize().then(() => {
    const app: Express = express();
    app.use(express.json());

    app.use('/user', userRouter);

    return app.listen(process.env.PORT);

});

