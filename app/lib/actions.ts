'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
// import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { fetchProjectById } from './data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }


  
// Create a new project
// Create a new project
export async function createProject(formData: {
  project_name: string;
  latitude: string;
  longitude: string;
  primary_commodity: string;
  secondary_commodity: string;
  product: string;
  project_status: string;
  approved_status: string;
  created_by: string;
}) {
  try {
    await sql`
      INSERT INTO projects (
        project_name, 
        latitude, 
        longitude,
        primary_commodity,
        secondary_commodity,
        product,
        project_status,
        approved_status,
        created_by,     
        created_at,
        updated_at
      )
      VALUES (
        ${formData.project_name}, 
        ${parseFloat(formData.latitude)}, 
        ${parseFloat(formData.longitude)},
        ${formData.primary_commodity},
        ${formData.secondary_commodity},
        ${formData.product},
        ${formData.project_status},
        ${formData.approved_status},
        ${formData.created_by},
        NOW(),
        NOW()        
      )
    `;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}
  
// Update an existing project
export async function updateProject(project: {
  project_id: string;
  project_name: string;
  latitude: string;
  longitude: string;
  primary_commodity: string;
  secondary_commodity: string;
  product: string;
  project_status: string;
  updated_by: string;
  updated_at: string;
  }) {
    // Validate input
    if (!project.project_id || !project.project_name ) {
      throw new Error('Missing or invalid fields');
    }
    console.log('input validated...');

    const latitude = parseFloat(project.latitude);
    const longitude = parseFloat(project.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Invalid latitude or longitude');
    }
    console.log('attempting to update project');
    try {
      const existingProject = await fetchProjectById(project.project_id);
      if (!existingProject) {
        throw new Error('Project not found');
      }

      await sql`
        UPDATE projects
        SET 
          project_name = ${project.project_name}, 
          latitude = ${latitude}, 
          longitude = ${longitude},
          primary_commodity = ${project.primary_commodity},
          secondary_commodity = ${project.secondary_commodity},
          product = ${project.product},
          project_status = ${project.project_status},
          updated_by = ${project.updated_by},
          updated_at = NOW()
        WHERE project_id = ${project.project_id}
      `;
      console.log("updated database");
    } catch (error) {

      console.error('Error updating project');

      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
    }
    // Cannot run redirect. Redirect internally throws an error so it should be called outside of try/catch blocks
    revalidatePath('/dashboard/projects')
      //redirect(`/dashboard/projects/${project.project_id}`)

}

// Delete an existing project
// To Be DEBUGGED - try catch creates ussues where the page errors out put the action is still completed (The 'delete' is carried out before the page error)
export async function deleteProject(id: string) {
  try {
    // Delete related records in the attachments table
    await sql`
      DELETE FROM attachments WHERE project_id = ${id}
    `;

    // Delete associated key_events
    await sql`
      DELETE FROM key_events WHERE project_id = ${id}
    `;

    // Delete the project
    await sql`
      DELETE FROM projects WHERE project_id = ${id}
    `;


  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
  // Cannot run redirect. Redirect internally throws an error so it should be called outside of try/catch blocks
  revalidatePath('/dashboard/projects')
    //redirect(`/dashboard/projects/${project.project_id}`)
}

// Attachments
// Create a new attachment

export async function createAttachment(prevState: any, formData: FormData) {
  const project_id = formData.get('project_id') as string;
  const link_name = formData.get('link_name') as string;
  const link_url = formData.get('link_url') as string;
  const file_name = formData.get('file_name') as string;
  const file_url = formData.get('file_url') as string;
  const notes = formData.get('notes') as string;
  const created_by = 'no-userTBI'; // Replace with actual user ID from session

  try {
    await sql`
      INSERT INTO attachments (project_id, link_name, link_url, file_name, file_url, notes, created_by)
      VALUES (${project_id}, ${link_name}, ${link_url}, ${file_name}, ${file_url}, ${notes}, ${created_by})
    `;
    return { success: true, message: 'Attachment created successfully!' };
  } catch (error) {
    console.error('Error creating attachment:', error);
    return { success: false, message: 'Failed to create attachment' };
  }
}
// Review a project
// this function changes approved by which may be a loggic error, perhaps an extra reviewd by field in addition to approved by is needed
export async function updateProjectReviewStatus(formData: {
  project_id: string;
  approved_status: string;
  review_notes?: string;
  reviewed_by?: string;
}) {
  try {
      await sql`
          UPDATE projects
          SET 
              approved_status = ${formData.approved_status},
              review_notes = ${formData.review_notes || null},
              reviewed_by = ${formData.reviewed_by || null},
              updated_at = NOW()
          WHERE project_id = ${formData.project_id}
      `;
  } catch (error) {
      console.error('Error updating project review:', error);
      throw new Error('Failed to update project review');
  }
  revalidatePath(`/dashboard/projects/${formData.project_id}`);
  // revalidatePath('/dashboard/projects');
}

// delete an attachment - NOT TESTED
export async function deleteAttachment(id: string) {
  try {
    await sql`
      DELETE FROM attachments WHERE attachment_id = ${id}
    `;
  } catch (error) {
    console.error('Error deleting attachment:', error);
    throw new Error('Failed to delete attachment');
  }
  console.log(`Attachment with ID: ${id} deleted successfully.`);
  // revalidatePath('/dashboard/projects')
}
//   redirect(`/dashboard/projects/${project.project_id}`)
// }


