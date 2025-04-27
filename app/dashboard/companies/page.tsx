import { fetchAllCompanies } from "@/app/lib/fetchdb/fetch-companies";
import Link from "next/link";
import GridComponent from "@/app/ui/companies/grid-component";
import { Button } from "@/app/ui/button";
import Databox from "@/app/ui/devtools/databox";
import { PlusCircleIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Companies',
};


export default async function Page(){
    const AllCompanies = await fetchAllCompanies();
    

    return (
        <main>
            <div className="mb-4">
                <h2><strong>Company List</strong></h2>
                <p>Companies are the organisations that own, operate, or invest in critical minerals projects</p>
            </div>
            
            <GridComponent />
           <Databox rawData={AllCompanies} />
        </main>
    )
}