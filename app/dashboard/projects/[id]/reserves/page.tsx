import {fetchProjectById} from "@/app/lib/data";
import Link from "next/link";
import {fetchProjectsCommoditites} from "@/app/lib/data";
import NewReservesForm from "@/app/ui/projects/newReservesForm"
import { auth } from "@/auth"

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export default async function Page(props: { params: Promise<{id: string}>}) {
    const params = await props.params;
    const [p] = await fetchProjectById(params.id);
    const cp = await fetchProjectsCommoditites(params.id);

    const session = await auth();

    const commoditiesArray = cp.map(row => {
        return {
            commodity_id: row.commodity_id,
            commodity_name: row.commodity_name,
        }
    })

    return (
        <main>
            <Link href={`/dashboard/projects/${p.project_id}`}>
                <button type="button" className="flex items-center w-[200px] justify-center px-2 py-[2px] bg-[#cac6cb] border border-white border-b-black border-r-black text-black text-sm">
                Back
                </button>
            </Link>

            <h3>Reserves for Project: {p.project_name}</h3>

            <h3>New Reserve Record</h3>
            <NewReservesForm commodities={commoditiesArray} project_id={p.project_id} session={session} />
        </main>
    )
}