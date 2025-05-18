'use client'

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { createCompany } from "@/app/lib/writedb/write-companies";
import Link from "next/link";

export default function NewCompanyForm() {
    return (
        <form action={createCompany}>
            <main className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-6">
                    <h2>Create New Company</h2>
                    <Link href="/dashboard/companies">
                        <button className="fluent-default-button">Back</button>
                    </Link>
                </div>

                <fieldset className="flex flex-col gap-4">
                    <label htmlFor="name">Company Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter Company Name"
                        required
                    />

                    <label htmlFor="asx">ASX Code</label>
                    <input
                        id="asx"
                        type="text"
                        name="asx"
                        placeholder="Enter ASX code (optional)"
                    />

                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        placeholder="Enter notes (optional)"
                        rows={5}
                    />
                </fieldset>

                <button type="submit" className="fluent-primary-button mt-4 flex items-center gap-2">
                    <PlusCircleIcon className="w-5 h-5" />
                    Create Company
                </button>
            </main>
        </form>
    );
}
