import { fetchAllEvents } from "@/app/lib/data";
import GridComponent from "@/app/ui/keyevents/grid-component";
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Events',
};


export default async function Page(){


    return (
        <main>
            <div className="mb-4">
                <h2><strong>Key Events</strong></h2>
                <p>Key Events represent milestones or noteworthy events that have taken place in relation to a project or company associated to a project</p>
            </div>
            
            <GridComponent />
        </main>
    )
}