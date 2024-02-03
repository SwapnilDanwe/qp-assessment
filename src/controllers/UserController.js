import ResponseHandler from '../utils/ResponseHandler.js';
import GroceryService from '../services/GroceryService.js';
import OrderService from '../services/OrderService.js';

class UserController {
    async getGroceryList(req, res){
        try {
            //TODO would be taking limit & offset dynamically as input
            const items = await GroceryService.getAvailableGroceryItems(limit, offset);        
            return ResponseHandler(200, 'SUCCESS', {
                items: items,
                page: 1,
                limit: 50
            }, res);
        } catch (error) {
            return ResponseHandler(500, 'SOMETHING_WENT_WRONG', null, res)
        }
    }
    
    async createOrder(req, res){
        try {
            const { userId, items } = req.body;
            //TODO As of now we are accepting item ids, we would accept qty as well, ASSUMMING 1 qty per product as of now
            const order = await OrderService.createOrder(userId, items);
            return ResponseHandler(200, 'SUCCESS', order, res);
        } catch (error) {
            return ResponseHandler(500, 'SOMETHING_WENT_WRONG', null, res)
        }
    }
}

export default new UserController()