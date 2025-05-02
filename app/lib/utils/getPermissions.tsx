import postgres from "postgres";

const sql = postgres(process.env.SQL_URL!, {ssl: 'require'});

export async function getPermissions(user_id: string) {
    console.log(user_id)
    try {
        const [data] = await sql`SELECT permissions FROM users WHERE id = ${user_id};`
        return data.permissions;
    } catch (error) {
        console.error('Database Error:', error);
        return new Error('Database Error');
    }
}