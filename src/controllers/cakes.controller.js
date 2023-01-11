import { connection } from "../database/database.js";

export async function createTypeOfCake(req, res) {
    const {name, price, image, description} = req.body;

    try {
        const typeOfCake = await connection.query("SELECT * FROM cakes WHERE name=$1", [name])

        if (typeOfCake.rows.length) {
            res.sendStatus(409)
            return
        }

        await connection.query(
            "INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)",
            [name, price, image, description]
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}