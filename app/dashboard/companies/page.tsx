import { fetchAllCompanies } from "@/app/lib/fetchdb/fetch-companies";
import CompaniesDataGrid from "@/app/ui/companies/datagrid";
import { Button } from "@/app/ui/button";
import { PlusCircleIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: { good?: string } }) {

    const message = (await searchParams).state || "no query";

    // Type definition for company. Later, move to lib/definitions.ts
    type Company = {
        id: string;
        name: string;
    }

    const companies: Company[] = (await fetchAllCompanies()).map(row => ({
        id: row.company_id,
        name: row.company_name,
        asx: row.asx_code,
        notes: row.notes,
        created_at: new Date(row.created_at).toString(),
        updated_at: new Date(row.updated_at).toDateString()
    }));


    return (
        <main>
            <div className={"flex w-full flex-row"}>
                { (message == "good" && (
                    <div className="bg-green-200 w-full p-2 rounded-md">New company created.</div>
                ))}

            </div>
            <div className="flex w-full flex-row my-2 justify-between">
            <h2>Companies</h2>
                <Link href="/dashboard/companies/new">
                <Button className="-[12rem] flex gap-2 bg-[#DDD] hover:bg-[#DDD] active:bg-[#666] rounded-[2px] transition-none text-black font-mono font-bold border-black border-2">
                <PlusCircleIcon className="w-8"/>
                New Company
                </Button>
                </Link>
            </div>
            {/*{companies.map((company) => {*/}
            {/*return (*/}
            {/*    <div key={company.id}>*/}
            {/*    {company.id}*/}
            {/*</div>)*/}
            {/*})}*/}


            <CompaniesDataGrid initialCompanies={companies} />



            <textarea cols={80} className="w-full font-mono text-xs  bg-[#DDD] text-black  font-bold border-black border-2 my-6"  disabled rows={10}
                value={JSON.stringify(companies)}>
            </textarea>

        </main>
    )
}