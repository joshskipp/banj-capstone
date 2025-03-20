'use server';

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchKeyEvents() {
    try {
        const data = await sql `
            SELECT e.event_id, e.event_date, e.project_id, e.event_details, e.created_at, e.updated_at, p.project_name
            FROM key_events e
            INNER JOIN Projects p on e.project_id = p.project_id;`
        // const data = await sql`
        // SELECT * FROM key_events`;
        return data;
    } catch (error) {
        console.error("Database Error - Failed to fetch all key events", error);
        throw new Error('Failed to fetch all key events.')
    }
}

export async function fetchKeyEventsByProjectID(project_id: string) {
    try {
        const data = await sql`SELECT * FROM key_events WHERE project_id=${project_id};`
        return data;
    } catch (error) {
        console.error("Database Error - Failed to fetch key events of Project", error);
        throw new Error('Failed to fetch key events of Project.')
    }
}