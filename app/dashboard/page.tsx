import { fetchAllProjects, fetchFilteredProjects  } from "@/app/lib/data"
import { fetchProjectsPages } from '@/app/lib/data';
import Search from '@/app/ui/search/search';
import Link from "next/link";
import { Button } from "@/app/ui/button";
import DashboardSkeleton from "../ui/skeletons-old";


export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;

}){
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchProjectsPages(query);

    const AllProjects = await fetchAllProjects();
    const SearchedProjects = await fetchFilteredProjects(query, currentPage);
    const Pagination = await fetchProjectsPages(query);


    return (
        <div>
            <h2><strong>Dashboard</strong></h2>
            <div className="w-full">
                <DashboardSkeleton />
            </div>

            <div className="flex w-full flex-row justify-end">
                <Link href="/dashboard/projects/searchresults">
                <Button className="w-[12rem] flex gap-2">
                    Search Projects
                </Button>
                </Link>
                <br></br>
            </div>

            <div className="flex w-full flex-row justify-end">
                <Link href="/dashboard/help">
                <Button className="w-[12rem] flex gap-2">
                    Help
                </Button>
                </Link>
                <br></br>
            </div>


            {/* {AllProjects.map((project, i) => {
                return (
                    <div key={project.project_id} className="p-2 b-1 b-black">

                        <strong>{project.project_name}</strong><br />
                        <small>{project.project_id}</small><br />
                        {project.latitude}, {project.longitude}
                    </div>
                )
            })} */}
        </div>
    )
}