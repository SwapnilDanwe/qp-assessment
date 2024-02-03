import Pool from '../connections/mysql.js';

class GroceryService {
    constructor() {
        this.grocery_items_table = 'grocery_items';
    }

    async addGroceryItem(name, price, quantity) {
        const grocery_item = {
            name,
            price,
            available_qty : quantity,
            total_qty: quantity
        };
        const [result] = await Pool.query(`INSERT INTO ?? SET ?`,[this.grocery_items_table,grocery_item]);
        return result && result.affectedRows ? result[0] : null;
    }

    async getAllGroceryItems(limit, offset) {
        const [result] = await Pool.query(`SELECT * FROM ?? LIMIT ? OFFSET ?`,[this.grocery_items_table,limit, offset]);
        return result ? result : [];
    }
    
    async getAvailableGroceryItems(limit, offset) {
        const [result] = await Pool.query(`SELECT * FROM ?? WHERE available_qty > 0 LIMIT ? OFFSET ?`,[this.grocery_items_table,limit, offset]);
        return result ? result : [];
    }

    async removeGroceryItem(id) {
        const [result] = await Pool.query(`DELETE FROM ?? WHERE item_id = ?`,[this.grocery_items_table,id]);
        return result && result.affectedRows ? true : false;
    }

    async updateGroceryItemDetails(id, updates) {
        const [result] = await Pool.query(`UPDATE ?? SET ? WHERE item_id = ?`,[this.grocery_items_table,updates, id]);
        return result && result.affectedRows ? true : false;
    }
    
    async updateAvailableQty(id, qty) {
        const [result] = await Pool.query(`UPDATE ?? SET total_qty = total_qty + ?, available_qty = available_qty + ? WHERE item_id = ?`,[this.grocery_items_table, qty, qty, id]);
        return result && result.affectedRows ? true : false;
    }
}

export default new GroceryService();
