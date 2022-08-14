import express from 'express';
import { get, post } from '../controllers/order-controller';
import AuthService from '../services/auth-service';

const router = express.Router();

router.get('/', AuthService.authorize, get);
router.post('/', AuthService.authorize, post);

export default router;
