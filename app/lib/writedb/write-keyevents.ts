"use server"

import postgres from 'postgres';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";

const sql = postgres(process.env.SQL_URL!, {ssl: 'require'});

const FormSchema = z.object({
    project_id: z.string(),
    event_date: z.date(),
    event_details: z.string(),
    user_id: z.string()
})

const AddKeyEvent = FormSchema
const EditKeyEvent = FormSchema.omit({project_id: true, user_id:true})
export async function addKeyEvent(formData:any) {
    console.log("Adding key event...");
    console.log(formData);
    console.log(`User ID: ${formData.get("user_id")}`);
    const {project_id, event_date, event_details, user_id} = AddKeyEvent.parse({
            project_id: formData.get("project_id"),
            // @ts-ignore
            event_date: (new Date(formData.get("event_date"))),
            event_details: formData.get("event_details"),
            user_id: formData.get("user_id")

        }
    );

    await sql`INSERT INTO key_events (project_id, event_date, event_details, created_by)
              VALUES (${project_id}, ${event_date}, ${event_details}, ${user_id});`;

    revalidatePath(`/dashboard/keyevents/`);
    redirect(`/dashboard/keyevents`);
}

export async function updateKeyEvent(event_id: string, formData: FormData) {
    console.log("Update key event...");
    const {event_date, event_details} = EditKeyEvent.parse({
        // @ts-ignore
        event_date: new Date(formData.get("event_date")),
        event_details: formData.get("event_details"),
    })

    try {
        await sql`UPDATE key_events
                  SET event_date    = ${event_date},
                      event_details = ${event_details},
                      updated_at = now()
                  WHERE event_id = ${event_id};`
    } catch (error) {
        console.error(error);

    }

    revalidatePath(`/dashboard/keyevents/`);
    redirect(`/dashboard/keyevents`);

}