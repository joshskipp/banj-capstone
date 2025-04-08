import { fetchAllProjects, fetchFilteredProjects  } from "@/app/lib/data"
import { fetchProjectsPages } from '@/app/lib/data';
import Link from "next/link";
import { Button } from "@/app/ui/button";
import DashboardSkeleton from "../ui/skeletons-old";
import NewsReel from "../ui/dashboard/keyeventsreel";
import { fetchKeyEvents } from "../lib/fetchdb/fetch-keyevents";


export default async function Page(props: {
    
}){

    const AllProjects = await fetchAllProjects();
    const allKeyEvents = await fetchKeyEvents();
    

    return (
        <div>
            <h2><strong>Dashboard</strong></h2>

            <h3 className="mb-4"><strong>Shortcuts</strong></h3>
            
            <div className="w-full">
                <DashboardSkeleton />
            </div>
        </div>
    )
}