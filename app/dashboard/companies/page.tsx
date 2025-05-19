import { fetchAllCompanies } from "@/app/lib/fetchdb/fetch-companies";
import GridComponent from "@/app/ui/companies/grid-component";
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Companies',
};


export default async function Page(){

    return (
        <main>
            <div className="mb-4">
                <h2><strong>Company List</strong></h2>
                <p>Companies are the organisations that own, operate, or invest in critical minerals projects</p>
            </div>
            
            <GridComponent />
            <br /><br />
        </main>
    )
}