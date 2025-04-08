import { fetchAllProjects, fetchFilteredProjects  } from "@/app/lib/data"
import { fetchProjectsPages } from '@/app/lib/data';
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

            <div className="flex w-full py-10 flex-row justify-end">
                <Link href="/dashboard/projects/searchresults">
                <Button className="w-[12rem] object-left px-10 flex gap-2">
                    Search Projects
                </Button>
                </Link>

                <Link href="/dashboard/help">
                <Button className="w-[12rem] object-left px-10 flex gap-2">
                    Help
                </Button>
                </Link>
                <br></br>
            </div>
            
        </div>
    )
}