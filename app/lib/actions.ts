'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
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
export async function createProject(formData: {
  project_name: string;
  latitude: string;
  longitude: string;
}) {
  try {
    await sql`
      INSERT INTO projects (project_name, latitude, longitude)
      VALUES (${formData.project_name}, ${parseFloat(formData.latitude)}, ${parseFloat(formData.longitude)})
    `;
    revalidatePath('/dashboard/projects'); // Refresh the projects list
    redirect('/dashboard/projects'); // Redirect to the projects list page
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
}

// Update an existing project
export async function updateProject(project: {
  project_id: string;
  project_name: string;
  latitude: string;
  longitude: string;
}) {
  // Validate input
  if (!project.project_id || !project.project_name || !project.latitude || !project.longitude) {
    throw new Error('Missing or invalid fields');
  }

  // Parse latitude and longitude to numbers
  const latitude = parseFloat(project.latitude);
  const longitude = parseFloat(project.longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Invalid latitude or longitude');
  }

  try {
    // Ensure project exists before updating
    const existingProject = await fetchProjectById(project.project_id);
    if (!existingProject) {
      throw new Error('Project not found');
    }

    // Update the project in the database
    await sql`
      UPDATE projects
      SET project_name = ${project.project_name}, latitude = ${latitude}, longitude = ${longitude}
      WHERE project_id = ${project.project_id}
    `;

    revalidatePath('/dashboard/projects'); // Refresh the projects list
    redirect('/dashboard/projects'); // Redirect to the projects list page
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
}

// Delte an existing project
// To Be DEBUGGED - try catch creates ussues where the page errors out put the action is still completed (The 'delete' is carried out before the page error)
export async function deleteProject(id: string) {
  try {
    // Delete related records in the attachments table
    await sql`
      DELETE FROM attachments WHERE project_id = ${id}
    `;

    // Delete the project
    await sql`
      DELETE FROM projects WHERE project_id = ${id}
    `;

    revalidatePath('/dashboard/projects'); // Refresh the projects list
    redirect('/dashboard/projects'); // Redirect to the projects list page
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
}