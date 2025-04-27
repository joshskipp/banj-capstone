import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function fetchComments(project_id: string) {
    try {
        const data = await sql`
            SELECT c.*, u.name 
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.project_id = ${project_id}
        `
        return data || [];
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}