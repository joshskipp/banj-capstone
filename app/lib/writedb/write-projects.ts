'use server';
import postgres from 'postgres';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { z } from "zod";

const sql = postgres(process.env.SQL_URL!, {ssl: 'require'});


const FormSchema = z.object({
    project_id: z.string(),
    commodity_id: z.string(),
    tonnage: z.string(),
    grade: z.string(),
    units_of_measurement: z.string(),
    estimate_date: z.date(),
    notes: z.string(),
    // created_at: z.date(),
    // updated_at: z.date(),
    // approved_at: z.date(),
    // updated_by: z.string(),
    // approved_by: z.string(),
});
// created_at: true, updated_at:true, approved_at:true, approved_by:true, updated_by:true
const AddReserves = FormSchema.omit({project_id: true, })

/**
 * Creates a "Reserves" record in the database using form input data and a project ID.
 * @param formData - The form data to be written to the database.
 * @param project_id - UUID (string) identifier for the project
 * @param commodity_id - UUID (string) identifier for the commodity of the Reserve
 */
export async function writeReserves(project_id: string, formData:FormData) {
    console.log("Writing reserves to project...");
    console.log("project id:", project_id);
    console.log("commoditiy id:", formData.get('cmod'));
    console.log(formData);


//TODO: Fix Estimate date for if a user does not provide a date.
    const { commodity_id, tonnage, grade, units_of_measurement, estimate_date, notes  } = AddReserves.parse({
        commodity_id: formData.get('cmod'),
        tonnage: formData.get("tonnage"),
        grade: formData.get("grade"),
        units_of_measurement: formData.get("units_of_measurement"),
        // @ts-ignore
        estimate_date: (new Date (formData.get("estimate_date"))),
        notes: formData.get("notes"),
    });

    console.log(`Fetched reserved data: \n
    Project id: ${project_id}\n
    CommodityId: ${commodity_id}\n
    Tonnage: ${tonnage}\n
    Grade: ${grade}\n
    Units: ${units_of_measurement}\n
    Estimate: ${estimate_date} (as string)\n
    Notes: ${notes}
    `);

    const estDate = new Date(estimate_date);
    console.log(estDate);


    await sql`
            INSERT INTO reserves
                (project_id, commodity_id, tonnage, grade, units_of_measurement, estimate_date, notes, approved_status)
            VALUES
                (${project_id}, ${commodity_id}, ${tonnage}, ${grade}, ${units_of_measurement}, ${estimate_date}, ${notes}, 'new')
            ;`

    revalidatePath(`/dashboard/projects/${project_id}`);
    redirect(`/dashboard/projects/${project_id}`);
}