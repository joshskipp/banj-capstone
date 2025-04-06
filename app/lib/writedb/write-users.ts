'use server';

import postgres from 'postgres';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

const FormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: `Passwords don't match`,
    path: ["confirmPassword"],
});

const CreateUser = FormSchema;

export async function createUser(formData: FormData) {
    const {name, email, password} = CreateUser.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        passwordConfirm: formData.get('passwordConfirm'),
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`INSERT INTO users (name, email, password)
              VALUES (${name}, ${email}, ${hashedPassword});`

    revalidatePath('/dashboard/settings');
    redirect(`/dashboard/settings`);
    // return {
    //     message: 'user created',
    // };
}

const updateUserPasswordSchema = z.object({
    user_id: z.string(),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match`,
    path: ["confirmPassword"],});

const UpdateUserPassword = updateUserPasswordSchema;

export async function updateUserPassword(formData: FormData) {

    const result = UpdateUserPassword.safeParse({
        user_id: formData.get('user_id'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    });
    if (result.success) {
        const hashedPassword = await bcrypt.hash(result.data.password, 10);

        await sql`UPDATE users
                    SET password = ${hashedPassword}
                    WHERE id=${result.data.user_id}`

        revalidatePath('/dashboard/settings');
        redirect(`/dashboard/settings`);
    } else {
        console.error('Validation errors:', result.error.errors);
    }
}