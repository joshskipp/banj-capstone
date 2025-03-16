import { fetchAllProjects } from "@/app/lib/data";
import Link from "next/link";
import GridComponent from "@/app/ui/projects/grid-component";

export default async function Page(){
    const AllProjects = await fetchAllProjects();

    return (
        <main>
            <GridComponent />
            <textarea disabled value={JSON.stringify(AllProjects, null, 2)}/>
        </main>
    )
}