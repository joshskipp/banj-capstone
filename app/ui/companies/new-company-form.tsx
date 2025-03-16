'use client'

import {Button} from "@/app/ui/button";
import {PlusCircleIcon } from "@heroicons/react/24/outline";
import { createCompany } from "@/app/lib/writedb/write-companies";

export default function NewCompanyForm() {
    return (
        <form className="p-3 mt-3 border-black rounded-[4px] border-2" action={createCompany}>
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
                            placeholder="Enter ASX code (optional)"

                        />

                </fieldset>

                <Button type="submit" className="-[12rem]">
                    <PlusCircleIcon className="w-8"/>
                    Create
                </Button>
            </div>
        </form>
    )
}