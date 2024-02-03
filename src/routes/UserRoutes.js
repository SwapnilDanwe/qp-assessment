import express from 'express';
import UserController from '../controllers/UserController.js';
const router = express.Router();

router.get('/list', UserController.getGroceryList);

router.post('/order', UserController.createOrder);
  
export default router
