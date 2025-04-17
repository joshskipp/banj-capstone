import postgres from "postgres";
import { AuditData, AuditRecord } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function writeAudit(auditData: AuditRecord) {
    // //     project_id: string,
    // previous_value: string[],
    // new_value: string[],
    // fields_affected: string[], *//
    const project_id = auditData.project_id;
    const user_id = auditData.user_id;
    const data = auditData.data;

    try {
        await sql`INSERT INTO audits (project_id, user_id, data) VALUES (${project_id}, ${user_id}, ${JSON.stringify(data)})`;
    } catch (error) {
        console.error('Error writing audit record:', error);
        throw error;
    }
}


