import { humanController } from '@/di container/human.dicontainer';
import express from 'express'
const humanRouter = express.Router();

humanRouter.post('/create', humanController.createHuman.bind(humanController));
humanRouter.get('/detail/:humanId', humanController.getHumanDetail.bind(humanController));


export default humanRouter;