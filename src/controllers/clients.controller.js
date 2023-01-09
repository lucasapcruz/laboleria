import { connection } from "../database/database.js";

export async function createClient(req, res) {
    const {name, address, phone} = req.body;

    try {
        await connection.query(
            "INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)",
            [name, address, phone]
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getClientOrders(req, res) {
    const {id} = req.params

    try {
        console.log(id)
        const orders = await connection.query(`
            SELECT
            orders.id AS "orderId",
            orders.quantity,
            TO_CHAR(orders."createdAt", 'YYYY-MM-DD HH24:MI') AS "createdAt",
            orders."totalPrice",
            cakes."name" AS "cakeName"
            FROM
            orders
            JOIN cakes
            ON
            orders."cakeId" = cakes.id
            WHERE
            orders."clientId" = $1
        `, [id]);

        if(orders.rows.length < 1){
            res.sendStatus(404)
            return
        }

        res.status(200).send(orders.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}