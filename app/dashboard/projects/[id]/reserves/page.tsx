import {fetchProjectById} from "@/app/lib/data";
import Link from "next/link";
import {writeReserves} from "@/app/lib/writedb/write-projects";
import {fetchProjectsCommoditites} from "@/app/lib/data";
import {Button} from "@/app/ui/button";
import NewReservesForm from "@/app/ui/projects/newReservesForm"

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export default async function Page(props: { params: Promise<{id: string}>}) {
    const params = await props.params;
    const [p] = await fetchProjectById(params.id);
    const cp = await fetchProjectsCommoditites(params.id);

    const commoditiesArray = cp.map(row => {
        return {
            commodity_id: row.commodity_id,
            commodity_name: row.commodity_name,
        }
    })

    function formData() {

    }

    return (
        <main>
            <Link href={`/dashboard/projects/${p.project_id}`}>
                <button type="button" className="flex items-center w-[200px] justify-center px-2 py-[2px] bg-[#cac6cb] border border-white border-b-black border-r-black text-black text-sm">
                Back
                </button>
            </Link>

            <h3>Reserves for Project: {p.project_name}</h3>

            {/*<form className="" action={writeReserves(FormData, p.project_id)}>*/}
            <h3>New Reserve Record</h3>
            <NewReservesForm commodities={commoditiesArray} project_id={p.project_id} />
            {/*<form className="grid grid-cols-5" action={formData}>*/}
            {/*    <label className={"grid col-span-1"}>Commodity</label>*/}
            {/*    <select id="cmod" className="border-1 border-black p-[0px] grid col-span-4 ">*/}
            {/*        {commoditiesArray.map((cp: any) => {*/}
            {/*            return (*/}
            {/*                <option key={cp.commodity_id}*/}
            {/*                        value={cp.commodity_id}>{cp.commodity_name}</option>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*    </select>*/}
            {/*    <label className={""}>Tonnage</label>*/}
            {/*    <input type="string" className={"grid col-span-4 "}></input>*/}
            {/*    <label >Units of Measure</label>*/}
            {/*    <input type="string" className={"grid col-span-4 "}></input>*/}
            {/*    <label>Grade</label>*/}
            {/*    <input type="string" className={"grid col-span-4 "}></input>*/}
            {/*    <label>Estimate Date</label>*/}
            {/*    <input type="date" className={"grid col-span-4 "}></input>*/}
            {/*    <label>Notes</label>*/}
            {/*    <textarea className={"grid col-span-4 "}></textarea>*/}
            {/*    <Button className="" type="submit">Submit</Button>*/}
            {/*</form>*/}
        </main>
    )
}