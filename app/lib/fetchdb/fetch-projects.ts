'use server';
import postgres from 'postgres';

const sql = postgres(process.env.SQL_URL!, {ssl: 'require'});

/**
 * Retrieves all reserves records (and all fields) from database for inputted project.
 *
 * @param project_id

 */
export async function fetchReserves(project_id: string ) {
    try {

        return await
            sql`
                SELECT r.*, commodities.commodity_name, users.name
                FROM Reserves r
                JOIN commodities on r.commodity_id = commodities.commodity_id
                JOIN users on r.created_by = CAST(users.id as varchar)
                WHERE r.project_id = ${project_id}`
    } catch (error) {
        console.error("Database Error: " + error + "\n Failed to fetch reserves from database for project: " + project_id);
        throw new Error("Failed to fetch reserves from database for project: " + project_id);
    }
}

/**
 * Retrieves all productions records (and all fields) from database for inputted project.
 *
 * @param project_id
 */
export async function fetchProductions(project_id: string) {
    try {
        return await sql`SELECT * FROM Productions WHERE project_id = ${project_id}`;
    } catch (error) {
        console.error("Database Error: " + error + "\n Failed to fetch reserves from database for project: " + project_id);
        throw new Error("Failed to fetch reserves from database for project: " + project_id);
    }
}

export async function fetchAllProjectNamePairs() {
    try {
        return await sql`SELECT project_id, project_name FROM Projects`;
    } catch (error) {
        console.error("Database Error: " + error + "\n Failed to fetch projects from database");
        throw new Error("Failed to fetch projects from database");
    }
}