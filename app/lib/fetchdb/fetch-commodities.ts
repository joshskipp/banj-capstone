'use server';
import postgres from 'postgres';

const sql = postgres(process.env.SQL_URL!, {ssl: 'require'});


export async function fetchAllCommodities() {
    try {
        const data = await sql`SELECT commodity_id, commodity_name FROM commodities`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch companies.');
    }
}
