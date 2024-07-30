import dogRouter from '@/routes/dog.routes';
import humanRouter from '@/routes/human.routes';
import BaseException from '@/utils/exception/BaseException';
import express from 'express'
import { StatusCodes } from 'http-status-codes';
export function route (app: express.Application, rootAPI: string) {
    
    //Checkpoint
    app.use(`${rootAPI}/checkpoint`, (req: any, res: any, next: any)=> {
        return res.status(200).json({message: 'Server is working'})
    })

    //Human
    app.use(`${rootAPI}/human`, humanRouter);

    //Dog
    app.use(`${rootAPI}/dog`, dogRouter);

    app.all('*', (req: any, res: any, next: any) => {
        const err = new BaseException("NOT_FOUND_ENDPOINT", 'API Not Exists', StatusCodes.NOT_FOUND);
        next(err);
    });
}