import {fetchKeyEvents} from "@/app/lib/fetchdb/fetch-keyevents";
import { Button } from "@/app/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page() {
    const allKeyEvents = await fetchKeyEvents();

    return (
        <main>
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Key Events</h2>
                    </div>

                    <div className="flex space-x-2">
                        <Link
                            href={`/dashboard/keyevents/create`}
                            className=""
                        >
                            <button className={"fluent-default-button"}>
                                Add Key Event
                            </button>
                        </Link>

                        <Link href="/dashboard/keyevents/searchresults">
                            <button className="fluent-default-button">
                                Search
                            </button>
                        </Link>
                    </div>
                </div>

                <p className={"my-2"}>Key Events are pivotal moments in a project's development.</p>

                <div className="flex flex-col gap-2">

                    {Object.values(allKeyEvents).map((e) => (
                        <div key={e.event_id} className={"bg-gray-50 p-3 rounded-lg flex flex-row justify-between"}>
                            <div className="flex flex-row w-3/4 justify-between p-2">
                                <div className={""}>
                                    <strong>{e.event_date.toLocaleString()}
                                        <Link href={`/dashboard/project/${e.project_id}`}
                                              className={"underline decoration-solid"}>{e.project_name}</Link></strong>
                                    <p>{e.event_details}</p>
                                </div>
                                <div className={"flex flex-row gap-2 h-fit"}>
                                    <Link href={`/dashboard/keyevents/${e.event_id}/edit`}><button className={"fluent-default-button"}>Edit</button></Link>
                                    <button className={"fluent-default-button"}>Delete</button>
                                </div>
                            </div>
                            <div className={"bg-gray-200 text-sm w-1/4 p-2 rounded-md"}>
                                <label className={"font-bold"}>Metadata</label>
                                <div className="grid grid-cols-2">
                                    <label>Created by</label>
                                    <span>{e.name}</span>
                                    <label>Created at</label>
                                    <span>{e.created_at.toLocaleString()}</span>
                                    <label>Updated at</label>
                                    <span>{e.updated_at.toLocaleString()}</span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}