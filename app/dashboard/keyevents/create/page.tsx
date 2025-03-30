import CreateKeyEvent from '@/app/ui/keyevents/create-keyevent'
import {fetchAllProjectNamePairs} from '@/app/lib/fetchdb/fetch-projects';
import Link from "next/link";
import {auth} from "@/auth";

export default async function Page(props: { params: Promise<{id: string}>}) {

    const session = await auth();


    const project = await fetchAllProjectNamePairs();
    return (
        <main className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">

            <div className="flex justify-between items-start mb-6">
                <h2>Create Key Events</h2>
                <Link href={"/dashboard/keyevents/"}>
                    <button className={"fluent-default-button"}>Back</button>
                </Link>
            </div>

            {/* @ts-ignore */}
            <CreateKeyEvent projectOptions={project} session={session} />
        </main>
    )
}