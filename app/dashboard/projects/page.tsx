import { fetchAllProjects } from "@/app/lib/data";
import GridComponent from "@/app/ui/projects/grid-component";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
};

export default async function Page(){
    const AllProjects = await fetchAllProjects();

    return (
        <main>

            <GridComponent />
            <textarea disabled value={JSON.stringify(AllProjects, null, 2)}/>
        </main>
    )
}