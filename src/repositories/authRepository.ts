import { connection } from "../database.js";

export async function verifyApiKey(apiKey: string) {
    const result = await connection.query(`
        SELECT * FROM companies WHERE "apiKey" = $1    
    `, [apiKey])

    return result.rows[0];
}