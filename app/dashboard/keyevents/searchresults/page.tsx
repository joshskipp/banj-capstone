import { fetchFilteredKeyEvents  } from "@/app/lib/data"
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


    const SearchedKeyEvents = await fetchFilteredKeyEvents(query, currentPage);


    return (
        <div>
            <h2><strong>Search Results for "{query}" </strong></h2>
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search />
                </div>
                
                {SearchedKeyEvents.map((key_event, i) => {
                    return (
                        <div key={key_event.event_id} className="my-3 p-2 bg-gray-200 hover:bg-[#A9A9A9] rounded-md">
                            <strong>{key_event.event_name}</strong><br />
                            ID: {key_event.event_id}<br />
                            Date:{key_event.event_date.toLocaleString()}<br />
                            <br />
                            {/* Constructing the link using the project_id */}
                            <a href={`/dashboard/keyevents/${key_event.event_id}`}>
                                More...
                            </a>
                        </div>
                    );
                })}        
            </div>
        </div>
    )
}