'use server';
import postgres from "postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { UUID } from "crypto";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

/*
    CREATE NEW COMODITIES

    ASSIGN Comoditie to Project

*/

// May not be used due to change in implementation, due to.... reasons.
export async function AddProjectCommodity(formData: FormData) {
    console.log(formData);
    
    const project_id = formData.get('project_id') as string;
    const commodity_id = formData.get('commodity') as string;
    if (!project_id || !commodity_id) {
        throw new Error('Missing required fields');
    }
    let isPrimary:boolean = false;
    let isSecondary:boolean = false;

    if (formData.get('primary_or_secondary') == 'primary') {
        isPrimary = true;
    }

    if (formData.get('primary_or_secondary') == 'secondary') {
        isSecondary = true;
    }

    console.log(`Project id: ${project_id}, Commodity id: ${commodity_id}, isPrimary = ${isPrimary} isSecondary = ${isSecondary}`);

    // // Add Commoditiy to Project
    try {
        const result = await sql`
            Insert into project_commodities (project_id, commodity_id, isPrimary, isSecondary)
            Values (${project_id}, ${commodity_id}, ${isPrimary}, ${isSecondary});
        `;
        console.log(result);
    } catch (error) {
        console.error('Error writing record:', error);
        throw error;
    }
    
    // Create Reserves Value
    try {
        const result = await sql`
        Insert into reserves (project_id, commodity_id)
        Values (${project_id}, ${commodity_id});`
        console.log(result);

    } catch (error) {
        console.error('Error writing record:', error);
        throw error;
    }
    
    // Create Production Value
    try {
        const result = await sql`
        Insert into productions (project_id, commodity_id)
        Values (${project_id}, ${commodity_id});`
        console.log(result);

    } catch (error) {
        console.error('Error writing record:', error);
        throw error;
    }
    revalidatePath(`/dashboard/projects/${project_id}`);
    redirect(`/dashboard/projects/${project_id}`);
}

export async function updateReserves(formData: FormData) {
    console.log(formData);

    const UpdateReserves = {
    project_id: formData.get('project_id'),
    commodity_id: formData.get('commodity_id'),
    tonnage: formData.get('tonnage') ? formData.get('tonnage') : null,
    units_of_measurement: formData.get('units_of_measurement') ? formData.get('units_of_measurement') : null,
    grade: formData.get('grade'),
    estimate_date: formData.get('estimate_date') ? 
        new Date(formData.get('estimate_date') as string) : null,
    notes: formData.get('notes')
    }

    try {
        await sql`
        Update reserves
        Set tonnage                 = ${String(UpdateReserves.tonnage)}, 
            units_of_measurement    = ${String(UpdateReserves.units_of_measurement)},
            grade                   = ${String(UpdateReserves.grade)},
            estimate_date           = ${UpdateReserves.estimate_date},
            notes                   = ${String(UpdateReserves.notes)},
            updated_at = now()
        Where project_id = ${String(UpdateReserves.project_id)}
        And commodity_id = ${String(UpdateReserves.commodity_id)}
        ;`;
    } catch (error) {
        console.error('Error writing record:', error);
        throw error;
    }

    revalidatePath(`/dashboard/projects/${UpdateReserves.project_id}`);
    redirect(`/dashboard/projects/${UpdateReserves.project_id}`);
}

export async function updateProduction(formData: FormData) {
    console.log(formData);

    const UpdateProduction = {
        project_id: formData.get('project_id'),
        commodity_id: formData.get('commodity_id'),
        tonnage: formData.get('tonnage'),
        units_of_measurement: formData.get('units_of_measurement'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        notes: formData.get('notes')
    }

    try {
        await sql`
            Update productions
            Set tonnage = ${UpdateProduction.tonnage ? String(UpdateProduction.tonnage) : null},
                units_of_measurement = ${UpdateProduction.units_of_measurement ? String(UpdateProduction.units_of_measurement) : null},
                start_date = ${UpdateProduction.start_date ? new Date(UpdateProduction.start_date as string) : null},
                end_date = ${UpdateProduction.end_date ? new Date(UpdateProduction.end_date as string) : null},
                notes = ${UpdateProduction.notes ? String(UpdateProduction.notes) : null},
                updated_at = now()
            Where project_id = ${UpdateProduction.project_id ? String(UpdateProduction.project_id) : null}
            And commodity_id = ${UpdateProduction.commodity_id ? String(UpdateProduction.commodity_id) : null};
        `
    } catch (error) {
        console.error('Error writing record:', error);
        throw error;
    }

    revalidatePath(`/dashboard/projects/${UpdateProduction.project_id}`);
    redirect(`/dashboard/projects/${UpdateProduction.project_id}`);
}

