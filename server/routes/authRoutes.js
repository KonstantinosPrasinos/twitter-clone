
import { Router } from 'express';
const router = Router();
import loginController from '../controllers/loginController';

router.post('/login', loginController);

export default router;

