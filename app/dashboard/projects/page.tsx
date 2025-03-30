import { fetchAllProjects } from "@/app/lib/data";
import Link from "next/link";
import GridComponent from "@/app/ui/projects/grid-component";
import { Button } from "@/app/ui/button";

export default async function Page(){
    const AllProjects = await fetchAllProjects();

    return (
        <main>
            <div className="my-3 flex w-full flex-row justify-end">
                <Link href="/dashboard/projects/searchresults">
                <Button className="w-[12rem] flex gap-2">
                    Search Projects
                </Button>
                </Link>
                <br></br>
            </div>


            <GridComponent />
            <textarea disabled value={JSON.stringify(AllProjects, null, 2)}/>
        </main>
    )
}