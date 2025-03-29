import Databox from "@/app/ui/devtools/databox";
import { fetchKeyEvents } from "@/app/lib/fetchdb/fetch-keyevents";
import KeyEventsGrid from "@/app/ui/keyevents/keyevents-grid";
import Link from "next/link";
import {Button} from "@/app/ui/button";

export default async function Page() {
    const allKeyEvents = await fetchKeyEvents();

    return (
        <main>
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Key Events</h2>
                        {/*<small className="text-gray-500">projectid</small>*/}
                    </div>

                    <div className="flex space-x-2">
                        <Link
                            href={`/dashboard/keyevents/create`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add Key Event
                        </Link>
                    </div>
                </div>

                    <p>Key Events are pivotal moments in a project's development.</p>


            {/*    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">*/}
            {/*        <div className="bg-gray-50 p-4 rounded-lg">*/}
            {/*            <h3 className="font-semibold text-lg mb-3">Project Details</h3>*/}
            {/*            <ul className="space-y-2">*/}
            {/*                <li><b>Product:</b> prod</li>*/}
            {/*                <li><b>Latitude:</b> lat</li>*/}
            {/*                <li><b>Longitude:</b> long</li>*/}
            {/*                <li><b>ASX:</b> asx</li>*/}
            {/*                <li><b>Primary Commodity:</b>primary_commodity</li>*/}
            {/*                <li><b>Secondary Commodity:</b>secondary_commodity</li>*/}
            {/*                <li><b>Project Status:</b> project_status</li>*/}
            {/*                <li><b>Approval Status:</b> approved_status</li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}

            {/*        <div className="bg-gray-50 p-4 rounded-lg">*/}
            {/*            <h3 className="font-semibold text-lg mb-3">Metadata</h3>*/}
            {/*            <ul className="space-y-2">*/}
            {/*                <li><b>Key Events:</b> TOBeImplemented</li>*/}
            {/*                <li><b>Created at:</b> meta-created-by</li>*/}
            {/*                <li><b>Created by:</b> TOBeImplemented  </li>*/}
            {/*                <li><b>Updated at:</b> udpdated by</li>*/}
            {/*                <li><b>Approved by:</b> approval</li>*/}
            {/*                <li><b>Approved at:</b> approavl date</li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="mb-6">*/}
            {/*        <h3 className="font-semibold text-lg mb-3">Commodities</h3>*/}
            {/*        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">*/}

            {/*                    <div className="bg-gray-50 p-3 rounded-lg">*/}
            {/*                        <p>*/}
            {/*                            <Link href="#" className="text-blue-600 hover:underline">*/}
            {/*                                <strong>commod name</strong>*/}
            {/*                            </Link>*/}
            {/*                            value*/}
            {/*                        </p>*/}
            {/*                    </div>*/}

            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="mb-6">*/}
            {/*        <details className="group [&_summary::-webkit-details-marker]:hidden">*/}
            {/*            <summary className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">*/}
            {/*                <h3 className="font-semibold text-lg">Attachments (number)</h3>*/}
            {/*                <span className="transition group-open:rotate-180">*/}
            {/*  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">*/}
            {/*    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />*/}
            {/*  </svg>*/}
            {/*</span>*/}
            {/*            </summary>*/}

            {/*            <div className="mt-4 p-4 bg-gray-50 rounded-lg">*/}
            {/*                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">*/}

            {/*                            <div  className="border p-3 rounded-lg">*/}
            {/*                                <h4 className="font-medium">attlink</h4>*/}
            {/*                                <div className="mt-2 space-y-1">*/}
            {/*                                    <p>*/}
            {/*                                        <span className="text-sm text-gray-600">HyperLink: </span><Link*/}
            {/*                                        href="#"*/}
            {/*                                        target="_blank"*/}
            {/*                                        rel="noopener noreferrer"*/}
            {/*                                        className="inline-block px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200"*/}
            {/*                                    >*/}
            {/*                                        link url*/}
            {/*                                    </Link>*/}
            {/*                                    </p>*/}
            {/*                                    <p>*/}
            {/*                                        <span className="text-sm text-gray-600">Author: </span>*/}

            {/*                                        created_by_user*/}

            {/*                                    </p>*/}

            {/*                                        <p className="text-sm">*/}
            {/*                                            <span className="text-gray-600">Notes: </span>*/}
            {/*                                            if note they here*/}
            {/*                                        </p>*/}

            {/*                                </div>*/}
            {/*                            </div>*/}

            {/*                    </div>*/}
            {/*            </div>*/}
            {/*        </details>*/}


            </div>
        </main>
    )
}