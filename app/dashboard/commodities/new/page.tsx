import CreateCommodityForm from "@/app/ui/commodities/create-commodity";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { GetSession } from "@/app/lib/get-session";

export default async function Page() {
    const session = await GetSession();
    const reviewerName = session?.name || '';

    return (
        <div>
            <h1>Create Commodity</h1>
            <CreateCommodityForm reviewerName={reviewerName} session={session} />
            <Link href="/dashboard/commodities">
                <Button>
                    Back to Commodities
                </Button>
            </Link>
        </div>
    )
}