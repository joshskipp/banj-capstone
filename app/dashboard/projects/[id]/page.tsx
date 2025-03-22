import { fetchProjectById, fetchProjectsCommoditites } from "@/app/lib/data";
import { Metadata, ResolvingMetadata } from 'next';
import NewReservesForm from "@/app/ui/projects/newReservesForm"
import Link from "next/link";

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

    const id:string = p.project_id
    const commodititiesArray = cp.map(row => {
        return {
            commodity_id: row.commodity_id,
            commodity_name: row.commodity_name,
        }
    })


    return (
        <div>
            <h2>{p.project_name}</h2>
            <small>{p.project_id}</small>
            <ul>
                <li><b>Product:</b> {p.product}</li>
                <li><b>Latitude:</b> {p.latitude}</li>
                <li><b>Longitude:</b> {p.longitude}</li>

            </ul>

            <hr className="my-3 border-black" />
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
                </div>
                <div className="w-1/2 p-3 bg-gray-200 rounded-md">
                    <h3>Productions</h3>

                </div>
            </div>


            <hr className="my-3 border-black" />
            <p>{JSON.stringify(cp)}</p>

            <h3>Commodity</h3>
            {cp.map((cp) => {
                let val:string = ""
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