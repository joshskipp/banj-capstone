'use client'

import {Button} from "@/app/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Company, CompanyForm } from "@/app/lib/definitions";
import { updateCompany  } from "@/app/lib/writedb/write-companies";

export default function EditCompanyForm(
    {company}: {company: CompanyForm}
) {
    const updateCompanyWithId = updateCompany.bind(null, company.company_id)

    return (
        <form className="p-3 mt-3 border-black rounded-[4px] border-2" action={updateCompanyWithId}>
            <div className="flex flex-col gap-2">
                <fieldset>
                    <legend className="required">Required</legend>
                    <label
                        className=""
                        htmlFor="name"
                    >
                        Company Name
                    </label>

                        <input
                            className=""
                            id="name"
                            type="text"
                            name="name"
                            defaultValue={company.company_name}
                            placeholder="Enter Company Name"
                            required
                        />
                </fieldset>

                <fieldset>
                    <legend>Optional</legend>

                    <label
                        className=""
                        htmlFor="asx"
                    >
                        ASX Code
                    </label>

                        <input
                            className="peer"
                            id="asx"
                            type="text"
                            name="asx"
                            defaultValue={company.asx_code}
                            placeholder="Enter ASX code (optional)"

                        />

                    <label
                        className=""
                        htmlFor="notes"
                    >
                        Notes
                    </label>
                    <textarea
                        className="peer w-full"
                        id="notes"
                        name="notes"
                        defaultValue={company.notes}
                        placeholder="Enter notes (optional)"
                        rows={5}
                    />

                </fieldset>

                <Button type="submit" className="-[12rem]">
                    <PencilSquareIcon className="w-8"/>
                    Update Company
                </Button>
            </div>
        </form>
    )
}