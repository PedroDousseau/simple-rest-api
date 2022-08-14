import express from 'express';
import {
  get,
  getBySlug,
  getById,
  getByTag,
  post,
  put,
  deleteProduct,
} from '../controllers/product-controller';
import AuthService from '../services/auth-service';

const router = express.Router();

router.get('/', get);
router.get('/:slug', getBySlug);
router.get('/:id', getById);
router.get('/tags/:tag', getByTag);
router.post('/', AuthService.isAdmin, post);
router.put('/:id', AuthService.isAdmin, put);
router.delete('/', AuthService.isAdmin, deleteProduct);

export default router;
