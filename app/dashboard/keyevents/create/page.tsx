import CreateKeyEvent from '@/app/ui/keyevents/create-keyevent'
import {fetchAllProjects} from '@/app/lib/data';
import {fetchAllProjectNamePairs} from '@/app/lib/fetchdb/fetch-projects';
import Link from "next/link";
export default async function Page() {

    const project = await fetchAllProjectNamePairs();


    return (
        <main className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">

            <div className="flex justify-between items-start mb-6">
                <h2>Create Key Events</h2>
                <Link href={"/dashboard/keyevents/"}><button className={"fluent-default-button"}>Back</button></Link>
            </div>

            {/* @ts-ignore */}
            <CreateKeyEvent projectOptions={project} />
        </main>
    )
}