'use client'

import { Button } from "@/app/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CompanyForm } from "@/app/lib/definitions";
import { updateCompany } from "@/app/lib/writedb/write-companies";
import Link from "next/link";

export default function EditCompanyForm({ company }: { company: CompanyForm }) {
    const updateCompanyWithId = updateCompany.bind(null, company.company_id);

    return (
        <form action={updateCompanyWithId}>
            <main className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-6">
                    <h2>Editing Company: {company.company_name}</h2>
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
                        defaultValue={company.company_name}
                        placeholder="Enter Company Name"
                        required
                    />

                    <label htmlFor="asx">ASX Code</label>
                    <input
                        id="asx"
                        type="text"
                        name="asx"
                        defaultValue={company.asx_code}
                        placeholder="Enter ASX code (optional)"
                    />

                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        defaultValue={company.notes}
                        placeholder="Enter notes (optional)"
                        rows={5}
                    />
                </fieldset>

                <button type="submit" className="fluent-primary-button mt-4 flex items-center gap-2">
                    <PencilSquareIcon className="w-5 h-5" />
                    Update Company
                </button>
            </main>
        </form>
    );
}
