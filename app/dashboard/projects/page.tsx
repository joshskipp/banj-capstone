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
            <Link href="/dashboard/projects/create">
                <Button>Create Project</Button>
            </Link>
            <div className="my-3 flex w-full flex-row justify-end">
                <Link href="/dashboard/projects/searchresults">
                <Button className="w-[12rem] flex gap-2">
                    Search Projects
                </Button>
                </Link>
                <br></br>
            </div>

            <div style={{ display: 'flex', gap: '1rem', fontSize: '10px' }}>
                <PlusCircleIcon title="Add Project" className="w-5 h-5"/>

                <Link href="/dashboard/projects/searchresults">
                <MagnifyingGlassIcon title="Search Projects" className="w-5 h-5"/>
                </Link>             

                <ArrowDownTrayIcon title="Export Projects" className="w-5 h-5"/>
            </div>


            <GridComponent />
           <Databox rawData={AllProjects} />
        </main>
    )
}