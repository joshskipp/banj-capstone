'use client';

import { RemoveProjectCompany } from "@/app/lib/writedb/write-projects";

export default function RemoveCompanyRef({ projectId, companyID }: { projectId: string, companyID: string }) {

    return (
        <button 
            className="bg-red-400 p-[0.35rem] rounded-sm  text-gray-100 uppercase text-xs"
            onClick={() => RemoveProjectCompany(projectId,companyID)}>
                X
        </button>
    )
}