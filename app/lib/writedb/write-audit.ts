import postgres from "postgres";
import { AuditData, AuditRecord } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function writeAudit(sqlResult: any, user_id: string, prev_value?: any) {
    // Write Audit Record

    // Get fields affected
    let fields_affected = [];
    for (const key in sqlResult[0]) {
      fields_affected.push(key);
    }

    // Get old value
    console.log('prev_value:',prev_value);

    // Get Project ID if exitsts
    let project_id;
    if (sqlResult[0].project_id) {
        project_id = sqlResult[0].project_id;
    } else {
        project_id = null;
    }

    const auditData: AuditData = {
        project_id: sqlResult[0].project_id,
        previous_value: prev_value,
        new_value: sqlResult,
        fields_affected: fields_affected
    }


    try {
        await sql`INSERT INTO audits (project_id, user_id, data) VALUES (${project_id}, ${user_id}, ${JSON.stringify(auditData)})`;
        return "Sucess";
    } catch (error) {
        console.error('Error writing audit record:', error);
        throw error;
    }
}


