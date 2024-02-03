import express from 'express';
import { AdminRoutes, UserRoutes } from './src/routes/index.js';
import pool from './src/connections/mysql.js'; //Import mysql to create mysql connection
const app = express();
const PORT = 3002;

app
.use(express.json())
.use(express.urlencoded({extended: false}))
.use('/admin', AdminRoutes)
.use('/user', UserRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
