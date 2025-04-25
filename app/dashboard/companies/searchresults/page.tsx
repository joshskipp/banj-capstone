import { fetchFilteredCompanies  } from "@/app/lib/data"
import Search from '@/app/ui/search/search';


export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
    

}){
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;


    const SearchedCompanies = await fetchFilteredCompanies(query, currentPage);


    return (
        <div>
            <h2><strong>Search Results for "{query}" </strong></h2>
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search />
                </div>
                
                {SearchedCompanies.map((company, i) => {
                    return (
                        <div key={company.company_id} className="my-3 p-2 bg-gray-200 hover:bg-[#A9A9A9] rounded-md">
                            <strong>{company.name}</strong><br />
                            ID: {company.company_id}<br />
                            Notes:{company.notes}<br />
                            <br />
                            {/* Constructing the link using the project_id */}
                            <a href={`/dashboard/companies/${company.company_id}`}>
                                More...
                            </a>
                        </div>
                    );
                })}        
            </div>
        </div>
    )
}