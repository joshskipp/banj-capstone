import Form from '@/app/ui/companies/edit-company-form';
import { fetchCompanyByID } from "@/app/lib/fetchdb/fetch-companies";

export default async function Page(props: { params: Promise<{id: string}>}) {
    const params = await props.params;
    const id = params.id;
    const [row] = await fetchCompanyByID(id);
    const c = {
        company_id: row.company_id,
        company_name: row.company_name,
        asx_code: row.asx_code,
        notes: row.notes,
    };

    return (
        <div>
            <Form company={c} />
        </div>
    )
}