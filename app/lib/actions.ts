'use server'; // Mark this as a Server Action

import postgres from 'postgres';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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
    return { success: true };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: 'Failed to create project' };
  }
}