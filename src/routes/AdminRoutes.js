import express from 'express';
import { AdminController } from '../controllers/index.js';
const router = express.Router();

router.post('/add', AdminController.addGroceryItem);
  
router.get('/list', AdminController.getGroceryItems);
  
router.delete('/remove/:id', AdminController.deleteGroceryItem);

router.put('/update/:id', AdminController.updateGroceryItem);

router.put('/manage-inventory/:id', AdminController.manageInventory);

export default router
