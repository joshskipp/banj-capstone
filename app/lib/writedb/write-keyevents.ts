"use server"

import postgres from 'postgres';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { z } from "zod";

const sql = postgres(process.env.SQL_URL!, {ssl: 'require'});

const FormSchema = z.object({
    project_id: z.string(),
    event_date: z.date(),
    event_details: z.string()
})

const AddKeyEvent = FormSchema

export async function addKeyEvent(formData:FormData) {
    console.log("Adding key event...");
    console.log(formData);

    const {project_id, event_date, event_details} = AddKeyEvent.parse({
            project_id: formData.get("project_id"),
            // @ts-ignore
            event_date: (new Date(formData.get("event_date"))),
            event_details: formData.get("event_details"),
        }
    );

    await sql`INSERT INTO key_events (project_id, event_date, event_details)
              VALUES (${project_id}, ${event_date}, ${event_details});`;

    revalidatePath(`/dashboard/keyevents/`);
    redirect(`/dashboard/keyevents`);
}