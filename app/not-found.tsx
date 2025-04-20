"use client"
import NavBar from "@/app/ui/dashboard/nav-bar";

export default function NotFound() {
    return (
        <div className="">
            <div className="flex container flex-row mx-auto px-4 items-start border-b-[#7a232a] gap-2.5">
                <NavBar />
            </div>
            <main className="container grow mx-auto px-4 py-4">
                <h2>404 | Page not Found</h2>
            </main>

        </div>
    )
}