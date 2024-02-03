import Pool from '../connections/mysql';

class MysqlDB {
    async up(){
        const [res] = await Pool.query(`CREATE DATABASE IF NOT EXISTS grocery_booking`);

        const [res2] = await Pool.query(`CREATE TABLE IF NOT EXISTS grocery_items (
            item_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            available_qty INT NOT NULL DEFAULT 0,
            total_quantity INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

        const [res3] = await Pool.query(`CREATE TABLE IF NOT EXISTS orders (
            order_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            total_amount INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );`);

        const [res4] = await Pool.query(`CREATE TABLE IF NOT EXISTS order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL,
            grocery_item_id INT NOT NULL,
            quantity INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (grocery_item_id) REFERENCES grocery_items(id)
        )`);

        const [res5] = await Pool.query(`CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            role_id SMALLINT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

        const [res6] = await Pool.query(`CREATE TABLE IF NOT EXISTS user_roles (
            role_id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);
    }
}

export default new MysqlDB()