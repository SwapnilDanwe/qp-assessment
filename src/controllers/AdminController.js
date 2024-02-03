import ResponseHandler from '../utils/ResponseHandler.js';
import GroceryService from '../services/GroceryService.js';

class AdminController {
    async addGroceryItem(req, res){
        try {
            const { name, price, quantity } = req.body;
            //TODO Need to add proper validation for item
            const newItem = await GroceryService.addGroceryItem(name, price, quantity);        
            return ResponseHandler(200, 'SUCCESS', newItem, res);
        } catch (error) {
            return ResponseHandler(500, 'SOMETHING_WENT_WRONG', null, res)
        }
    }

    async getGroceryItems(req, res){
        try {
            const items = GroceryService.getAllGroceryItems(50,0); //TODO would be taking dynamically as input     
            return ResponseHandler(200, 'SUCCESS', {
                items: items,
                page: 1,
                limit: 50
            }, res);
        } catch (error) {
            return ResponseHandler(500, 'SOMETHING_WENT_WRONG', null, res)
        }
    }

    async deleteGroceryItem(req, res){
        try {
            const itemId = parseInt(req.params.id);
            const res = await GroceryService.removeGroceryItem(itemId);
            if (!res)
                return ResponseHandler(400, 'Invalid Item', null, res);
            
            return ResponseHandler(200, 'Item removed successfully', null, res);
        } catch (error) {
            return ResponseHandler(500, 'SOMETHING_WENT_WRONG', null, res)
        }
    }

    async updateGroceryItem(req, res){
        try {
            const itemId = parseInt(req.params.id);
            const updates = req.body;
            //TODO Need to add proper validation for item
            const res = await GroceryService.updateGroceryItemDetails(itemId, updates);
            if (!res)
                return ResponseHandler(400, 'Invalid Item', null, res);

            return ResponseHandler(200, 'Item details updated successfully', null, res);
        } catch (error) {
            return ResponseHandler(500, 'SOMETHING_WENT_WRONG', null, res)
        }
    }

    async manageInventory(req, res){
        try {
            const itemId = parseInt(req.params.id);
            const { quantity } = req.body;
            //TODO Need to add proper validation, we could accept negative qty to decrease available qty
            const res = await GroceryService.updateAvailableQty(itemId, quantity);
            if (!res) {
                return ResponseHandler(400, 'Invalid Item', null, res);
            }
            return ResponseHandler(200, 'Inventory updated successfully', null, res);
        } catch (error) {
            return ResponseHandler(500, 'SOMETHING_WENT_WRONG', null, res)
        }
    }
}
export default new AdminController()