'use server';
import postgres from 'postgres';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";

const sql = postgres(process.env.SQL_URL!, {ssl: 'require'});

const FormSchema = z.object({
    project_id: z.string(),
    commodity_id: z.string(),
    tonnage: z.string(),
    grade: z.string(),
    units_of_measurement: z.string(),
    estimate_date: z.date(),
    notes: z.string(),
});

const AddReserves = FormSchema.omit({project_id: true})

/**
 * Creates a "Reserves" record in the database using form input data and a project ID.
 * @param deets
 * @param formData - The form data to be written to the database.
 */
export async function writeReserves(deets: { project_id: string, user_id: string }, formData: FormData) {
    console.log("Writing reserves to project...");
    console.log("project id:", deets.project_id);
    console.log("user_id:", deets.user_id);
    console.log(formData);


//TODO: Fix Estimate date for if a user does not provide a date.
    const {commodity_id, tonnage, grade, units_of_measurement, estimate_date, notes} = AddReserves.parse({
        commodity_id: formData.get('cmod'),
        tonnage: formData.get("tonnage"),
        grade: formData.get("grade"),
        units_of_measurement: formData.get("units_of_measurement"),
        // @ts-ignore
        estimate_date: (new Date(formData.get("estimate_date"))),
        notes: formData.get("notes"),
    });

    console.log(`Fetched reserved data: \n
    Project id: ${deets.project_id}\n
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
        (project_id, commodity_id, tonnage, grade, units_of_measurement, estimate_date, notes, approved_status,
         created_by)
        VALUES (${deets.project_id}, ${commodity_id}, ${tonnage}, ${grade}, ${units_of_measurement}, ${estimate_date},
                ${notes}, 'new', ${deets.user_id})
        ;`

    revalidatePath(`/dashboard/projects/${deets.project_id}`);
    redirect(`/dashboard/projects/${deets.project_id}`);
}