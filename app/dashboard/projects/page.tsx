import { fetchAllProjects } from "@/app/lib/data";
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
    const AllProjects = await fetchAllProjects();
    

    return (
        <main>
            <h2><strong>Project List</strong></h2>

            <GridComponent />
           <Databox rawData={AllProjects} />
        </main>
    )
}