import { fetchCommodityById, fetchCommodityProjects } from "@/app/lib/data";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const [c] = await fetchCommodityById(params.id);
    const cp = await fetchCommodityProjects(params.id);

    return (
        <main className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{c.commodity_name}</h2>
                    <small className="text-gray-500">{c.commodity_id}</small>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Commodity Details</h3>
                    <ul className="space-y-2">
                        <li><b>Element:</b> {c.element}</li>
                        <li><b>Units of Measure:</b> {c.units_of_measure}</li>
                        {c.notes && <li><b>Notes:</b> {c.notes}</li>}
                    </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Metadata</h3>
                    <ul className="space-y-2 text-sm">
                        <li><b>Created at:</b> {c.created_at.toLocaleString()}</li>
                        <li><b>Created by:</b> {c.created_by}</li>
                        <li><b>Updated at:</b> {c.updated_at.toLocaleString()}</li>
                        <li><b>Approved by:</b> {c.approved_by}</li>
                        <li><b>Approved at:</b> {c.approved_at.toLocaleString()}</li>
                    </ul>
                </div>
            </div>

            <hr className="my-3 border-black" />

            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Projects Using This Commodity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cp.map((cp) => {
                        let val = "";
                        if (cp.isprimary) val += "Primary ";
                        if (cp.issecondary) val += "Secondary ";
                        val = val.trim() ? ` - ${val}Commodity` : "";

                        return (
                            <div key={cp.project_id} className="bg-gray-50 p-3 rounded-lg">
                                <p>
                                    <Link
                                        href={`/dashboard/projects/${cp.project_id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        <strong>{cp.project_name}</strong>
                                    </Link>
                                    {val}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}


// export default async function Page(props: { params: Promise<{id: string}>}) {
//     const params = await props.params;
//     const [c] = await fetchCommodityById(params.id);
//     const cp = await fetchCommodityProjects(params.id);

//     return (
//         <div>
//             <h2>{c.commodity_name}</h2>
//             <ul>
//                 <li><strong>ID:</strong> {c.commodity_id}</li>
//                 <li><strong>Element:</strong> {c.element}</li>
//                 <li><strong>Units of Measure:</strong> {c.units_of_measure}</li>
//             </ul>
//             <p>{c.notes}</p>

//             <hr className="my-3 border-black" />
//             <small>
//                 <ul>
//                     <li>Created at: {c.created_at.toString()}</li>
//                     <li>Created by: {c.created_by}</li>
//                     <li>Updated at: {c.updated_at.toString()}</li>
//                     <li>Approved by: {c.approved_by}</li>
//                     <li>Approved at: {c.approved_at.toString()}</li>
//                 </ul>
//             </small>

//             <hr className="my-3 border-black" />
//             <h3>Projects with Commodity</h3>
//             {cp.map((cp) => {
//                 let val:string = ""
//                 if (cp.isprimary) val = val.concat(val, "Primary");
//                 if (cp.issecondary) val = val.concat(val, "Secondary");
//                 val = ` - ${val} Commodity`
//                 return (
//                     <div key={cp.project_id}>
//                         <p><a href="#"><strong>{cp.project_name}</strong></a>{val}</p>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }