import { fetchAllCompanies } from "@/app/lib/fetchdb/fetch-companies";
import CompaniesDataGrid from "@/app/ui/companies/datagrid";
export default async function Page() {

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
            <h2>Companies</h2>
            {/*{companies.map((company) => {*/}
            {/*return (*/}
            {/*    <div key={company.id}>*/}
            {/*    {company.id}*/}
            {/*</div>)*/}
            {/*})}*/}

            <CompaniesDataGrid initialCompanies={companies} />


            <textarea cols={80} className="w-full font-mono text-xs bg-gray-200 my-6"  disabled rows={10}
                value={JSON.stringify(companies)}>
            </textarea>

        </main>
    )
}