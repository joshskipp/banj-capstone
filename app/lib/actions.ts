'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

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

  export async function deleteProject(id: string) {
    // try {

      await sql`
        DELETE FROM projects WHERE project_id = ${id}
      `;
      revalidatePath('/dashboard/projects'); // Refresh the projects list
      redirect('/dashboard/projects'); // Redirect to the projects list page
    // } 
    // catch (error) {
    //   console.error('Error deleting project:', error);
    //   throw new Error('Failed to delete project');
    // }
  }