import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchAllCompanies() {
    try {
        const data = await sql`SELECT * FROM companies`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch companies.');
    }
}

export async function fetchCompanyByID(id: string) {
    try {
        return await sql`SELECT * FROM companies WHERE company_id=${id}`;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch companies.');
    }
}