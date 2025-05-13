import { fetchAllProjects, fetchAllProjectsData } from "@/app/lib/data";
import Link from "next/link";
import GridComponent from "@/app/ui/projects/grid-component";
import { Button } from "@/app/ui/button";
import Databox from "@/app/ui/devtools/databox";
import { PlusCircleIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Projects',
};


export default async function Page(){
    const AllProjects = await fetchAllProjectsData();
    

    return (
        <main>
            <div className="mb-4">
                <h2><strong>Project Directory</strong></h2>
                <p>Projects are a foundational data type that represent individual critical minerals initiatives. Projects serve as the central node connecting other data types such as Commodities, Companies, and Key Events</p>
            </div>

            <GridComponent />
           <Databox rawData={AllProjects} />
        </main>
    )
}