import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function fetchAudit(project_id: string) {
    try {
        const data = await sql`SELECT a.*, u.name FROM audits a JOIN users u ON a.user_id = u.id WHERE a.project_id = ${project_id}`;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        return new Error('Database Error');
    }
}
