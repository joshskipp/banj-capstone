import { fetchAllCompanies } from "@/app/lib/fetchdb/fetch-companies";
import CompaniesDataGrid from "@/app/ui/companies/datagrid";
import { Button } from "@/app/ui/button";
import { PlusCircleIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import Databox from "@/app/ui/devtools/databox";


export default async function Page() {

    // Type definition for company. Later, move to lib/definitions.ts
    type Company = {
        company_id: string;
        name: string;
    }

    const companies:Company[] = (await fetchAllCompanies()).map(row => ({
        company_id: row.company_id,
        name: row.company_name,
        asx: row.asx_code,
        notes: row.notes,
        created_at: new Date(row.created_at).toLocaleString(),
        updated_at: new Date(row.updated_at).toLocaleString()
    }));


    return (
        <main>
            {/* Notification Banner for new project here*/}
            {/*<div className={"flex w-full flex-row"}>*/}
            {/*    { ((stateIsGood) && (*/}
            {/*        <div className="bg-green-200 w-full p-2 rounded-md">New company created.</div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div className="flex w-full flex-row my-2 justify-between">
            <h2>Companies</h2>
                <Link href="/dashboard/companies/new">
                <Button className="-[12rem]">
                <PlusCircleIcon className="w-8"/>
                New Company
                </Button>
                </Link>
            </div>

            <CompaniesDataGrid initialCompanies={companies} />

            <Databox rawData={companies} />

        </main>
    )
}