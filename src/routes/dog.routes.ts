import { AuthAction } from '@/auth/AuthAction';
import { AuthSubject } from '@/auth/AuthSubject';
import { dogController } from '@/di container/dog.dicontainer';
import { checkPermission } from '@/middleware/checkPermission.middleware';
import { authenticateJWT } from '@/middleware/jwt.authenticate.middleware';
import express from 'express'

const dogRouter = express.Router();

dogRouter

.post('/create', authenticateJWT, checkPermission(AuthAction.CREATE, AuthSubject.DOG), dogController.createNewDog.bind(dogController))

export default dogRouter;