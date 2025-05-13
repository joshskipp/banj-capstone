import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { fetchCompanyByID } from "@/app/lib/fetchdb/fetch-companies";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const [c] = await fetchCompanyByID(params.id);

    return (
        <main className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{c.company_name}</h2>
                    <small className="text-gray-500">{c.company_id}</small>
                </div>
                <div className="flex space-x-2">
                    <Link href={`/dashboard/companies/${c.company_id}/edit`}>
                        <Button className="flex items-center bg-white text-black border border-black hover:bg-gray-700 hover:text-white">
                            <PencilSquareIcon className="w-5 h-5 mr-2" />
                            Edit Data
                        </Button>
                    </Link>
                    <Link href="/dashboard/companies">
                        <Button className="flex items-center bg-blue-600 text-white hover:bg-blue-700">
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Back to Companies
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Company Details</h3>
                    <ul className="space-y-2 text-sm">
                        <li><b>Company Name:</b> {c.company_name}</li>
                        <li><b>ASX Code:</b> {c.asx_code}</li>
                        <li><b>Notes:</b> {c.notes}</li>
                    </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Metadata</h3>
                    <ul className="space-y-2 text-sm">
                        <li><b>Created at:</b> {c.created_at.toLocaleString()} by {c.created_by}</li>
                        <li><b>Updated at:</b> {c.updated_at.toLocaleString()} by {c.updated_by}</li>
                        <li><b>Approved at:</b> {c.approved_at.toLocaleString()} by {c.approved_by}</li>
                    </ul>
                </div>
            </div>

            <hr className="my-4 border-gray-300" />

            <div>
                <h3 className="font-semibold text-lg mb-2">Dev Tools - Raw Data</h3>
                <textarea
                    className="w-full bg-gray-100 p-2 rounded text-xs font-mono"
                    readOnly
                    rows={10}
                    value={JSON.stringify(c, null, 2)}
                />
            </div>
        </main>
    );
}
