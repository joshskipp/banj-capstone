'use server'; // Mark this as a Server Action

import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';


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
