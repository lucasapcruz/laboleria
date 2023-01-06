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