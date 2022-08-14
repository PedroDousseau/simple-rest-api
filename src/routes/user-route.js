import express from 'express';
import { post, authenticate, refreshToken } from '../controllers/user-controller';
import AuthService from '../services/auth-service';

const router = express.Router();

router.post('/', post);
router.post('/authenticate', authenticate);
router.post('/refresh-token', AuthService.authorize, refreshToken);

export default router;
