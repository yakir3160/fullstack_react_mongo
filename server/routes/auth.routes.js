import { Router } from 'express';
import {registerUser,logUser} from  '../controllers/auth.controller.js';

const router = Router();





router.post('/register',registerUser)
router.post('/login',logUser)


export default router;