import Link from "next/link";
import {Button} from "@/app/ui/button";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";

export default async function Page(props: { params: Promise<{id: string}>}) {
    const params = await props.params;

    return (
        <div>
            <div className="flex w-full flex-row my-2 justify-between">
                <h2>{params.id}</h2>
                <Link href="/dashboard/companies">
                    <Button className="-[12rem] flex gap-2 bg-[#DDD] hover:bg-[#DDD] active:bg-[#666] rounded-[2px] transition-none text-black font-mono font-bold border-black border-2">
                        <ArrowLeftIcon className="w-8"/>
                        Back to Companies
                    </Button>
                </Link>
            </div>
            <h2>Company Name Here</h2>

        </div>
    )
}