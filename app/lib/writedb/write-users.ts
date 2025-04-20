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
}