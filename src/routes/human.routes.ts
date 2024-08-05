import { humanController } from '@/di container/human.dicontainer';
import express from 'express';
const humanRouter = express.Router();

/* 
/api/v1/human
*/
humanRouter

  .post('/create', humanController.createHuman.bind(humanController))

  .post('/login', humanController.humanLogin.bind(humanController))

  .get('/detail/:humanId', humanController.getHumanDetail.bind(humanController))

  .get('/list-paging', humanController.getHumanListPaging.bind(humanController));

export default humanRouter;
