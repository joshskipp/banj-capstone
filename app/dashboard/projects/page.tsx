import { fetchAllProjects } from "@/app/lib/data";
import Link from "next/link";
import GridComponent from "@/app/ui/projects/grid-component";
import { Button } from "@/app/ui/button";
import Databox from "@/app/ui/devtools/databox";
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


            <GridComponent />
           <Databox rawData={AllProjects} />
        </main>
    )
}