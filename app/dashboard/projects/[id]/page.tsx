import {fetchProjectById, fetchProjectsCommoditites, fetchAttachmentsByProjectId} from "@/app/lib/data";
import DeleteProjectButton from "@/app/ui/projects/delete-project";
import {notFound} from 'next/navigation';
import UploadAttachmentForm from "@/app/ui/projects/upload-attachment";
import Link from 'next/link';
import {Button} from "@/app/ui/button";
import {fetchKeyEventsByProjectID} from "@/app/lib/fetchdb/fetch-keyevents";
import Databox from "@/app/ui/devtools/databox";
// import {Metadata, ResolvingMetadata} from 'next';
import {fetchReserves} from "@/app/lib/fetchdb/fetch-projects";

// type Props = {
//     params: Promise<{ id: string }>
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }

// export async function generateMetadata(
//     {params, searchParams}: Props,
//     parent: ResolvingMetadata
// ): Promise<Metadata> {
//     const id = (await params).id;
//     const project = await fetchProjectById(id);
//
//     return {
//         title: `${project.project_name}`,
//     }
// }

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const p = await fetchProjectById(id);
    const cp = await fetchProjectsCommoditites(id);
    const attachments = await fetchAttachmentsByProjectId(id);

    if (!p) {
        notFound();
    }

    const key_events = await fetchKeyEventsByProjectID(id);

    /**
     * Fetch Project Reserves
     */
    const pReserves = await fetchReserves(id);

    return (
        <main>
             {/* Add Review Status Banner */}
             {/* {p.approved_status === 'not_approved' && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                <strong>Pending Re-review</strong>
                            </p>
                        </div>
                    </div>
                </div>
            )} */}
            {/* Add Review Status Banner */}
            {p.approved_status !== 'Approved for External Use' && (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                <strong>Approval Status Warning:</strong> This project is not approved for external use.
                            </p>
                            <p>
                                <strong>Reviewer Notes: </strong> 
                                {/* if review_notes is null Display the following message. */}
                                {p.review_notes ? p.review_notes : "This Project has not been reviewed at this stage."}
                                
                            </p>
                        </div>
                    </div>
                </div>
                        )}
            {p.approved_status === 'Under review' && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                <strong>Approval Status:</strong> This project is currently in review at this time.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {p.approved_status === 'Approved for External Use' && (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-green-700">
                                <strong>Approval Status:</strong> This project is <strong>approved for external use.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* EDITS/ DELETE and Review*/}
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{p.project_name}</h2>
                        <small className="text-gray-500">{p.project_id}</small>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/dashboard/projects/edit/${id}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Edit Project
                        </Link>

                        <Link
                            href={`/dashboard/projects/review/${id}`}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            Review Project
                        </Link>
                        
                        <DeleteProjectButton projectId={id}/>
                    </div>

                </div>

                {/* Details */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Project Details</h3>
                        <ul className="space-y-2">
                            <li><b>Product:</b> {p.product}</li>
                            <li><b>Latitude:</b> {p.latitude}</li>
                            <li><b>Longitude:</b> {p.longitude}</li>
                            <li><b>ASX:</b> {p.asx}</li>
                            <li><b>Primary Commodity:</b> {p.primary_commodity}</li>
                            <li><b>Secondary Commodity:</b> {p.secondary_commodity}</li>
                            <li><b>Project Status:</b> {p.project_status}</li>
                            <li><b>Approval Status:</b> {p.approved_status}</li>
                        </ul>
                    </div>


                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Metadata</h3>
                        <ul className="space-y-2">
                            <li><b>Key Events:</b> TOBeImplemented</li>
                            <li><b>Created at:</b> {p.created_at?.toLocaleString()}</li>
                            <li><b>Created by:</b> TOBeImplemented {p.created_by}</li>
                            <li><b>Updated at:</b> {p.updated_at?.toLocaleString()}</li>
                            <li><b>Approved by:</b> {p.approved_by || 'Not approved'}</li>
                            <li><b>Approved at:</b> {p.approved_at?.toLocaleString()}</li>
                        </ul>
                    </div>
                </div>

                <hr className="my-3 border-black"/>


                <div className="flex flex-row my-2 gap-2 rounded-md">
                    <div className="w-1/2 p-3 bg-gray-200 rounded-md">
                        <h3>Reserves</h3>
                        <Link href={`/dashboard/projects/${p.project_id}/reserves`}><u>Add Reserves Record</u></Link>
                        {pReserves.map((r) => {
                            return (
                                <div key={r.commodity_id}>
                                    <div className="grid grid-cols-2 p-[2px] border-[1px] border-gray-600">
                                        <strong className={""}>{r.commodity_name}</strong>
                                        <p><em>Approval Status: '{r.approved_status}'</em></p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>Tonnage</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>{r.tonnage}</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>Units of Measure</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>{r.units_of_measurement}</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>Grade</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>{r.grade}</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>Estimate Date</p>
                                        <p className={"border-t-[1px] border-t-gray-600"}>{r.estimate_date.toLocaleString()}</p>
                                        <p className={"col-span-2 border-t-[1px] border-t-gray-600"}>Notes</p>
                                        <p className={"col-span-2 border-t-[1px] border-t-gray-600"}>{r.notes}</p>
                                    </div>
                                    <div className={"text-sm"}>
                                        <small>
                                            <strong>Created
                                                at</strong> {r.created_at.toLocaleString()} by <strong>{r.name}</strong><br/>
                                            <strong>Updated at</strong> {r.updated_at.toLocaleString()}<br/>
                                            <strong>Approved
                                                at</strong> {r.approved_at.toLocaleString()} by <strong>{r.approved_by}</strong></small>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    <div className="w-1/2 p-3 bg-gray-200 rounded-md">
                        <h3>Productions</h3>

                    </div>
                </div>


                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">Commodities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cp.map((cp) => {
                            let val: string = "";
                            if (cp.isprimary) val = val.concat(val, "Primary");
                            if (cp.issecondary) val = val.concat(val, "Secondary");
                            val = ` - ${val} Commodity`;
                            return (
                                <div key={cp.commodity_id} className="bg-gray-50 p-3 rounded-lg">
                                    <p>
                                        <Link href="#" className="text-blue-600 hover:underline">
                                            <strong>{cp.commodity_name}</strong>
                                        </Link>
                                        {val}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-6">
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                            <h3 className="font-semibold text-lg">Attachments ({attachments.length})</h3>
                            <span className="transition group-open:rotate-180">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            </span>
                        </summary>

                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <UploadAttachmentForm projectId={id}/>

                            {attachments.length > 0 ? (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {attachments.map((attachment) => (
                                        <div key={attachment.attachment_id} className="border p-3 rounded-lg">
                                            <h4 className="font-medium">{attachment.link_name}</h4>
                                            <div className="mt-2 space-y-1">
                                                <p>
                                                    <span className="text-sm text-gray-600">HyperLink: </span><Link
                                                    href={attachment.link_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200"
                                                >
                                                    {attachment.link_url}
                                                </Link>
                                                </p>
                                                <p>
                                                    <span className="text-sm text-gray-600">Author: </span>

                                                    {attachment.created_by}

                                                </p>
                                                {attachment.notes && (
                                                    <p className="text-sm">
                                                        <span className="text-gray-600">Notes: </span>
                                                        {attachment.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 mt-4">No attachments yet.</p>

                            )}
                        </div>
                    </details>
                </div>

                <div className="mb-6">
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                            <h3 className="font-semibold text-lg">Key Events ({key_events.length})</h3>
                            <span className="transition group-open:rotate-180">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            </span>
                        </summary>

                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">

                            {key_events.length > 0 ? (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {key_events.map((k) => (
                                        <div key={k.event_id} className="border p-3 rounded-lg">
                                            <h4 className="font-medium">{k.event_date.toLocaleDateString()}</h4>
                                            <div className="mt-2 space-y-1">
                                                <p>
                                                </p>
                                                <p>
                                                    <span className="text-sm text-gray-600">Author: </span>

                                                    {k.created_by}

                                                </p>
                                                {k.event_details && (
                                                    <p className="text-sm">
                                                        <span className="text-gray-600">Details: </span>
                                                        {k.event_details.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 mt-4">No key events.</p>

                            )}
                        </div>
                    </details>
                </div>


                <Link href="/dashboard/projects">
                    <Button>
                        Back to Projects
                    </Button>
                </Link>
                <Databox rawData={cp}/>
                <hr/>

                <hr className="my-3 border-black"/>
                <h3>Key Events</h3>
                {/* Displays key events, if there aren't any, display a meaningful message */}
                {key_events[0] != null ? key_events.map((k) => {
                    return (
                        <div key={k.event_id}>
                            <p>{k.event_date.toLocaleDateString()} - <strong>{k.event_details}</strong></p>
                        </div>
                    )
                }) : (<p>No key events</p>)}
                <Databox rawData={key_events}/>
            </div>
        </main>
    );
}