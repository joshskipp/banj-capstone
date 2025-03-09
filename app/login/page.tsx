import { Suspense } from 'react';
import LoginForm from '@/app/ui/login-form'
import Link from 'next/link';

export default function LoginPAge() {
    return (
        <main>
            <div className="relative h-screen">
                { /* Background Pattern */}
                <div className="absolute inset-0">
                    <div
                        className="relative h-full w-full bg-slate-950 [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [&>div]:bg-[size:14px_24px]">
                        <div></div>

                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
                    <div className="max-w-2xl  text-left">
                        <h1 className="mb-8 text-5xl font-bold tracking-tight text-white">
                            Authentication required.
                            {/*<span className="text-sky-400">Project</span>*/}
                        </h1>
                        <Suspense>
                            <LoginForm/>
                        </Suspense>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 mt-4">
                            For access, please see Georesources Intelligence unit.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            {/*<button*/}
                            {/*    className="rounded-lg px-6 py-3 font-medium bg-sky-400 text-slate-900 hover:bg-sky-300">*/}
                            {/*    Get Started*/}
                            {/*</button>*/}
                            <Link href="/">
                            <button
                                className="rounded-lg border px-6 py-3 font-medium border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
                                Back to landing
                            </button>
                            </Link>
                            </div>
                    </div>
                </div>
            </div>
        </main>
    )
}