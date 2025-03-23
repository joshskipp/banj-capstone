import { fetchProjectById, fetchProjectsCommoditites } from "@/app/lib/data";
import { Metadata, ResolvingMetadata } from 'next';
import Link from "next/link";
import { fetchReserves }  from "@/app/lib/fetchdb/fetch-projects";

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = (await params).id;
    const [project] = await fetchProjectById(id);

    return {
        title: `${project.project_name}`,
    }
}


export default async function Page(props: { params: Promise<{id: string}>}) {
    const params = await props.params;

    const [p] = await fetchProjectById(params.id);
    const cp = await fetchProjectsCommoditites(params.id);

    /**
     * Fetch Project Reserves
     */
    const pReserves = await fetchReserves(params.id);


    return (
        <div>
            <h2>{p.project_name}</h2>
            <small>{p.project_id}</small>
            <ul>
                <li><b>Product:</b> {p.product}</li>
                <li><b>Latitude:</b> {p.latitude}</li>
                <li><b>Longitude:</b> {p.longitude}</li>

            </ul>

            <hr className="my-3 border-black"/>
            <small>
                <ul>
                    <li>Created at: {p.created_at.toString()}</li>
                    <li>Created by: {p.created_by}</li>
                    <li>Updated at: {p.updated_at.toString()}</li>
                    <li>Approved by: {p.approved_by}</li>
                    <li>Approved at: {p.approved_at.toString()}</li>
                </ul>
            </small>

            <div className="flex flex-row my-2 gap-2 rounded-md">
                <div className="w-1/2 p-3 bg-gray-200 rounded-md">
                    <h3>Reserves</h3>
                    <Link href={`/dashboard/projects/${p.project_id}/reserves`}><u>Add Reserves Record</u></Link>
                    {pReserves.map((r) => {
                        return (
                            <div key={r.commodity_id}>
                                <div className="grid grid-cols-2 p-[2px] border-[1px] border-gray-600">
                                    <strong className={""}>{r.commodity_name}</strong>
                                    <p><em>Approval Status: '{r.approved_status}'</em></p>
                                    <p className={"border-t-[1px] border-t-gray-600"}>Tonnage</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>{r.tonnage}</p>
                                    <p className={"border-t-[1px] border-t-gray-600"}>Units of Measure</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>{r.units_of_measurement}</p>
                                    <p className={"border-t-[1px] border-t-gray-600"}>Grade</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>{r.grade}</p>
                                    <p className={"border-t-[1px] border-t-gray-600"}>Estimate Date</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>{r.estimate_date.toLocaleString()}</p>
                                    <p className={"col-span-2 border-t-[1px] border-t-gray-600"}>Notes</p>
                                    <p className={"col-span-2 border-t-[1px] border-t-gray-600"}>{r.notes}</p>
                                </div>
                                <div className={"text-sm"}>
                                    <small>
                                        <strong>Created at</strong> {r.created_at.toLocaleString()} by <strong>{r.name}</strong><br />
                                        <strong>Updated at</strong> {r.updated_at.toLocaleString()}<br />
                                        <strong>Approved at</strong> {r.approved_at.toLocaleString()} by <strong>{r.approved_by}</strong></small>
                                </div>

                            </div>
                        )
                    })}
                </div>
                <div className="w-1/2 p-3 bg-gray-200 rounded-md">
                    <h3>Productions</h3>

                </div>
            </div>


            <hr className="my-3 border-black"/>
            <p>{JSON.stringify(cp)}</p>

            <h3>Commodity</h3>
            {cp.map((cp) => {
                let val: string = ""
                if (cp.isprimary) val = val.concat(val, "Primary");
                if (cp.issecondary) val = val.concat(val, "Secondary");
                val = ` - ${val} Commodity`
                return (
                    <div key={cp.commodity_id}>
                        <p><a href="#"><strong>{cp.commodity_name}</strong></a>{val}</p>
                    </div>
                )
            })}
        </div>
    )
}