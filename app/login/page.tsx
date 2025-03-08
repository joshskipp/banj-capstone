import { Suspense } from 'react';
import LoginForm from '@/app/ui/login-form'

export default function LoginPAge() {
    return (
        <main>
            <h1>Login:</h1>
            <Suspense>
                <LoginForm />
            </Suspense>
        </main>
    )
}