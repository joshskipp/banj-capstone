import { fetchAllProjects, fetchFilteredProjects  } from "@/app/lib/data"
import { fetchProjectsPages } from '@/app/lib/data';
import Search from '@/app/ui/search/search';
//import Pagination from '@/app/ui/pagination';


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
            <h2><strong>Search Results for "{query}" </strong></h2>
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search />
                </div>
                
                {SearchedProjects.map((project, i) => {
                    return (
                        <div key={project.project_id} className="my-3 p-2 bg-gray-200 rounded-md">
                            <strong>{project.project_name}</strong><br />
                            <small>ID: {project.project_id}</small><br />
                            Coordinates: {project.latitude}, {project.longitude}
                            <br />
                            {/* Constructing the link using the project_id */}
                            <a href={`/dashboard/projects/${project.project_id}/dashboard/projects/${project.project_id}`}>
                                More...
                            </a>
                        </div>
                    );
                })}
                
                
            </div>
        </div>
    )
}