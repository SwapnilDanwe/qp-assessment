import Pool from '../connections/mysql.js';

class OrderService {
    constructor() {
        this.orders_table = 'orders'
        this.order_items_table = 'order_items'
    }

    async createOrder(userId, items) {
        let connection;
        try {
            //Get all items from db
            const [resultItems] = await Pool.query(`SELECT * FROM grocery_items WHERE item_id IN (?)`,[items]);
            if (resultItems.length !== items.length)
                throw new Error(`Invalid item selected`);

            connection = await Pool.getConnection();
            const grocery_item = {
                total_amount : totalAmt,
                user_id: userId
            };

            //Create order
            const [resultOrder] = await connection.query(`INSERT INTO orders SET ?`,[grocery_item]);
            const order_id = resultOrder && resultOrder.affectedRows ? resultOrder.insertId : null;
            if (!order_id) throw new Error(`Order not created`);
            
            let orderItems = [];
            let orderItemIds = [];
            let totalAmt = 0
            for (let i = 0; i < resultItems.length; i++) {
                orderItemIds.push(resultItems[i].item_id)
                totalAmt += resultItems[i].price
                orderItems.push({
                    order_id: order_id,
                    grocery_item_id: resultItems[i].item_id,
                    quantity: 1,
                })
            }

            //Add order items
            const [result] = await connection.query(`INSERT INTO order_items SET ?`,[orderItems]);
            if (!(result && result.affectedRows))
                throw new Error(`Order not created`);
            
            //Update quantity in db
            const [resultUpdate] = await connection.query(`UPDATE grocery_items SET available_qty = available_qty - 1 WHERE item_id IN (?)`,[orderItemIds]);
            if (!(resultUpdate && resultUpdate.affectedRows))
                throw new Error(`Order not created`);

            connection.commit()

            return {
                order_id
            };
        } catch (error) {
            if(connection)
                connection.rollback()
            throw error
        }
    }
}

export default new OrderService();
