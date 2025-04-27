"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import {z} from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

const FormSchema = z.object({
    comment_id: z.string(),
    comment: z.string(),
    user_id: z.string(),
    project_id: z.string()
})

const CreateCommentSchema = FormSchema.omit({comment_id: true})

export async function createComment(details: { project_id: string, user_id: string }, formData: FormData ) {

    const {comment, user_id, project_id} = CreateCommentSchema.parse({
        comment: formData.get('comment'),
        user_id: details.user_id,
        project_id: details.project_id
    })

    console.log(`
        Recieved Data for creating a comment: \n
        Project ID: ${project_id} \n
        User_ID: ${user_id} \n
        Comment: ${comment}
        `)
    
    try {
        await sql`INSERT INTO comments (comment, user_id, project_id)
        VALUES (${comment}, ${user_id}, ${project_id})`
    } catch (error) {
        console.log(error)
    }


    revalidatePath('/dashboard/projects/${project_id}')
    //redirect(`/dashboard/projects/${project_id}`)
    

}