import Link from "next/link";
import {Button} from "@/app/ui/button";
import {ArrowLeftIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import { fetchCompanyByID } from "@/app/lib/fetchdb/fetch-companies";

export default async function Page(props: { params: Promise<{id: string}>}) {
    const params = await props.params;
    const [c] = await fetchCompanyByID(params.id);

    return (
        <div>
            <div className="flex w-full my-2 items-center justify-between">
                <h2 className={""}>{c.company_name}</h2>

                <div className="flex flex-row-reverse space-x-2 gap-2">
                    <Link href="/dashboard/companies">
                        <Button className="ml-auto -[12rem]">
                            <ArrowLeftIcon className="w-8"/>
                            Back to Companies
                        </Button>
                    </Link>

                    <Link href={`/dashboard/companies/${c.company_id}/edit`}>
                    <Button className="ml-auto hover:bg-gray-700 bg-inherit border-black border-[1.15pt] hover:text-white text-black ">
                        <PencilSquareIcon className="w-6 mr-2" />
                        Edit data
                    </Button>
                    </Link>
                </div>
            </div>

            // TODO: Move to client component

            <form className={""}>
                <div className={"grid grid-cols-[15%,85%] gap-1 p-2"} >
                    <label className={"grid-cols-1 pt-4 pr-2"}>Company Name</label>
                    <input className={"grid-cols-2 bg-inherit border-1"} type="text" disabled value={c.company_name} />
                    <label className={"grid-cols-1 pt-4"}>ASX Code</label>
                    <input className={"grid-cols-2 bg-inherit border-1"} disabled type="text" value={c.asx_code} />
                    <label className={"grid-cols-1 pt-4 "}>Notes</label>
                    <textarea className={"grid-cols-2 bg-inherit border-1"} disabled cols={80} rows={5} value={c.notes} />
                </div>

            </form>

            <hr />
            <h3>Meta Data</h3>
            <p>Company entry created at: {c.created_at.toLocaleString()} by {c.created_by}.</p>
            <p>Last updated at {c.updated_at.toLocaleString()} by {c.updated_by}</p>
            <p>Last approved by: {c.approved_by} at {c.approved_at.toLocaleString()}</p>

            <hr />
            <h3>Dev Tools</h3>
            <h4>Raw Data</h4>
            <textarea className="dev" readOnly cols={80} rows={10} >
                {JSON.stringify(c, null, 2)}
            </textarea>

        </div>
    )
}