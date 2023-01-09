import { connection } from "../database/database.js";

export async function createOrder(req, res) {
    const {clientId, cakeId, quantity, totalPrice} = req.body;

    try {
        const clientsThatMatchId = await connection.query("SELECT * FROM clients WHERE id=$1", [clientId])

        if (clientsThatMatchId.length) {
            res.sendStatus(404)
            return
        }

        const cakesThatMatchId = await connection.query("SELECT * FROM cakes WHERE id=$1", [cakeId])

        if (cakesThatMatchId.length) {
            res.sendStatus(404)
            return
        }

        await connection.query(
            `INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4)`,
            [clientId, cakeId, quantity, totalPrice]
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getOrders(req, res) {
    const {date} = req.query

    try {
        let ordersQuery = `
            SELECT
            json_build_object('id', clients.id, 'name', clients.name, 'address', clients.address, 'phone', clients.phone) AS client,
            json_build_object('id', cakes.id, 'name', cakes.name, 'price', cakes.price , 'description', cakes.description, 'image', cakes.image) AS cake, 
            orders.id AS "orderId",
            TO_CHAR(orders."createdAt", 'YYYY-MM-DD HH24:MI') AS "createdAt",
            orders.quantity,
            orders."totalPrice"
            FROM
            orders
            JOIN cakes
            ON
            orders."cakeId" = cakes.id
            JOIN clients
            ON
            orders."clientId" = clients.id
        `

        let orders;

        if(date){
            ordersQuery += `WHERE "createdAt" >= $1`
            orders = await connection.query(ordersQuery, [date])
        }else{
            orders = await connection.query(ordersQuery);
        }

        if(orders.rows.length < 1){
            res.sendStatus(404)
            return
        }

        res.status(200).send(orders.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}


export async function getOrdersById(req, res) {
    const {id} = req.params

    try {
        console.log(id)
        const orders = await connection.query(`
            SELECT
            json_build_object('id', clients.id, 'name', clients.name, 'address', clients.address, 'phone', clients.phone) AS client,
            json_build_object('id', cakes.id, 'name', cakes.name, 'price', cakes.price , 'description', cakes.description, 'image', cakes.image) AS cake, 
            orders.id AS "orderId",
            orders."createdAt",
            orders.quantity,
            orders."totalPrice"
            FROM
            orders
            JOIN cakes
            ON
            orders."cakeId" = cakes.id
            JOIN clients
            ON
            orders."clientId" = clients.id
            WHERE orders.id = $1
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