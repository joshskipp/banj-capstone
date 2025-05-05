import { fetchAllEvents } from "@/app/lib/data";
import Link from "next/link";
import GridComponent from "@/app/ui/companies/grid-component";
import { Button } from "@/app/ui/button";
import Databox from "@/app/ui/devtools/databox";
import { PlusCircleIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Events',
};


export default async function Page(){
    const AllEvents = await fetchAllEvents();
    

    return (
        <main>
            <div className="mb-4">
                <h2><strong>Key Events</strong></h2>
                <p>Key Events represent milestones or noteworthy events that have taken place in relation to a project or company associated to a project</p>
            </div>
            
            <GridComponent />
           <Databox rawData={AllEvents} />
        </main>
    )
}