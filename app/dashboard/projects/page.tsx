import { fetchAllProjects } from "@/app/lib/data";
import GridComponent from "@/app/ui/projects/grid-component";
import Databox from "@/app/ui/devtools/databox";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
};

export default async function Page(){
    const AllProjects = await fetchAllProjects();

    return (
        <main>
            <GridComponent />
           <Databox rawData={AllProjects} />
        </main>
    )
}