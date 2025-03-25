import { fetchAllProjects } from "@/app/lib/data";
import Link from "next/link";
import GridComponent from "@/app/ui/projects/grid-component";
import { Button } from "@/app/ui/button";


export default async function Page(){
    const AllProjects = await fetchAllProjects();

    return (
        <main>
            <Link href="/dashboard/projects/create">
                <Button>Create Project</Button>
            </Link>
            <GridComponent />
            <textarea disabled value={JSON.stringify(AllProjects, null, 2)}/>
        </main>
    )
}