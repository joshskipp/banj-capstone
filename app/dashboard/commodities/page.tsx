import { fetchAllCommodities} from "@/app/lib/data";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { PlusCircleIcon} from "@heroicons/react/24/outline";

export default async function Page(){
    const AllCommodities = await fetchAllCommodities();

    return (
        <main>
            <h2>Commodities</h2>
            <p>Commodities are materials/minerals that are collected by resource projects. They can  be assigned to the projects as the primary or secondary commodity.</p>
            <div className="flex w-full flex-row justify-end">
                <Link href="/dashboard/commodities/new">
                <Button className="w-[12rem] flex gap-2">
                    <PlusCircleIcon className="w-8"/>
                    New Commodity
                </Button>
                </Link>
            </div>
            <div className="flex w-full flex-col gap-2 my-2">
            {AllCommodities.map((commodity) => {
               return (
                   <div key={commodity.commodity_id} className="p-2 bg-gray-200 rounded-md">
                       <Link href={`/dashboard/commodities/${commodity.commodity_id}`}><strong>{commodity.commodity_name}</strong></Link> - {commodity.element} <br />
                       Units of measure: {commodity.units_of_measure}<br />
                       Notes: {commodity.notes} <br />
                       <small>
                           <strong>ID:</strong> {commodity.commodity_id}<br />
                           <strong>Created by:</strong> {commodity.created_by}<br />
                           <strong>Created at:</strong> {commodity.created_at.toString()}<br />
                       </small>

                   </div>
               )
            })}
            </div>

        </main>
    )
}