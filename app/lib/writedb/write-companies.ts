'use server';
import {Company} from "@/app/lib/definitions";
import postgres from 'postgres';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

import {z} from 'zod';

const FormSchema = z.object({
    id: z.string(),
    name: z.string(),
    asx: z.string(),
    notes: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    approved_at: z.date()
});


const CreateCompany = FormSchema.omit({id: true, created_at: true, updated_at: true, approved_at: true});

export async function createCompany(formData: FormData) {
    // const rawFormData = {
    //     company_name: formData.get('name'),
    //     company_asx: formData.get('asx'),
    // }
    // console.log(rawFormData);

    const {name, asx, notes} = CreateCompany.parse({
        name: formData.get('name'),
        asx: formData.get('asx'),
        notes: formData.get('notes'),
    });

    await sql`INSERT INTO companies (company_name, asx_code, notes)
              VALUES (${name}, ${asx}, ${notes});`

    const message = 'good'
    const urlParams = new URLSearchParams([['state', message]]);

    revalidatePath('/dashboard/companies');
    redirect(`/dashboard/companies?${urlParams}`);
}

export async function updateCompany(id: string, formData: FormData) {
    const {name, asx, notes} = CreateCompany.parse({
        name: formData.get('name'),
        asx: formData.get('asx'),
        notes: formData.get('notes'),
    });

    try {
        await sql`
        UPDATE companies
        SET company_name = ${name}, asx_code = ${asx}, notes = ${notes}, updated_at = NOW()
        WHERE company_id = ${id}
    `;
    } catch (error) {
        console.log(error);
    }

    const message = 'good'
    const urlParams = new URLSearchParams([['state', message]]);

    revalidatePath('/dashboard/companies');
    redirect(`/dashboard/companies?${urlParams}`);
}