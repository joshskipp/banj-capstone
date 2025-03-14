'use client'

import {Button} from "@/app/ui/button";
import {PlusCircleIcon } from "@heroicons/react/24/outline";
import { createCompany } from "@/app/lib/writedb/write-companies";

export default function NewCompanyForm() {
    return (
        <form className="p-3 mt-3 border-black rounded-[4px] border-2" action={createCompany}>
                    <label
                        className="block text-xs font-medium font-mono text-gray-900"
                        htmlFor="name"
                    >
                        Company Name
                    </label>

                        <input
                            className="peer block w-full outline-2 font-mono text-xs"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter Company Name"
                            required
                        />

                    <label
                        className="block text-xs font-medium font-mono text-gray-900"
                        htmlFor="asx"
                    >
                        ASX Code
                    </label>

                        <input
                            className="peer block w-full outline-2 font-mono text-xs"
                            id="asx"
                            type="text"
                            name="asx"
                            placeholder="Enter ASX code (optional)"

                        />



                <Button type="submit" className="-[12rem] flex gap-2 bg-[#DDD] hover:bg-[#DDD] w-96 active:bg-[#666] rounded-[2px] transition-none text-black font-mono font-bold border-black border-2">
                    <PlusCircleIcon className="w-8"/>
                    Create
                </Button>
        </form>
    )
}