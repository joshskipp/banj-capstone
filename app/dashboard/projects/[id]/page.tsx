import {fetchProjectById, fetchProjectsCommoditites, fetchAttachmentsByProjectId} from "@/app/lib/data";
import ArchiveProjectButton from "@/app/ui/projects/archive-project";
import {notFound} from 'next/navigation';
import UploadAttachmentForm from "@/app/ui/projects/upload-attachment";
import CreateComment from "@/app/ui/projects/create-comment";
import Link from 'next/link';
import {Button} from "@/app/ui/button";
import {fetchKeyEventsByProjectID} from "@/app/lib/fetchdb/fetch-keyevents";
// import {Metadata, ResolvingMetadata} from 'next';
import {fetchReserves, fetchProductions, fetchProjectCompanies} from "@/app/lib/fetchdb/fetch-projects";
import { fetchAllCommodities } from "@/app/lib/fetchdb/fetch-commodities";
import { auth } from "@/auth"
import ProjectComments from "@/app/ui/projects/project-comments";
import { AddProjectCommodity } from "@/app/lib/writedb/write-commodities";
import ProjectReserves from "@/app/ui/projects/project-reserves";
import ProjectProductions from "@/app/ui/projects/newProductionsForm";
import { getPermissions } from "@/app/lib/utils/getPermissions";
import { fetchAllCompanies } from "@/app/lib/fetchdb/fetch-companies";
import { AddProjectCompany, RemoveProjectCompany } from "@/app/lib/writedb/write-projects";
import RemoveCompanyRef from "@/app/ui/projects/removeProjectCompany";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const p = await fetchProjectById(id);
    const cp = await fetchProjectsCommoditites(id);
    const attachments = await fetchAttachmentsByProjectId(id);
    const session = await auth();
    const permissions = await getPermissions(session?.user?.id || '');
    if (!p) {
        notFound();
    }

    const key_events = await fetchKeyEventsByProjectID(id);
    const commodity_list = await fetchAllCommodities();
    const company_list = await fetchAllCompanies();
    const project_companies = await fetchProjectCompanies(id);
    // Filter out the full list of commodities, of the current project commodities, to prevent adding duplicate commodities to the project.
    const filtered_commod = commodity_list.filter(commodity => 
        !cp.some(projectCommodity => projectCommodity.commodity_id === commodity.commodity_id)
    );

    const filtered_companies = company_list.filter(company => 
        !project_companies.some(projectCompany => projectCompany.company_id === company.company_id)
    );
    

    //
    
    /**
     * Fetch Project Reserves
     */
    const pReserves = await fetchReserves(id);
    const pProduction = await fetchProductions(id);

    return (
        <main>
             
            
            {/* Add Review Status Banner - Warning */}
            {(p.approved_status !== 'Approved for External Use' && p.approved_status !== 'Approved for Internal Use') && (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                <strong>Approval Status Warning:</strong> This project is not approved.
                            </p>
                            <p>
                                <strong>Reviewer Notes: </strong> 
                                {/* if review_notes is null Display the following message. */}
                                {p.review_notes ? p.review_notes : "This Project has not been reviewed at this stage."}
                                <br></br>This project status is <strong>{p.approved_status} </strong>
                                
                            </p>
                        </div>
                    </div>
                </div>
                        )}
                {/*  Add Review Status Banner - Under Review */}
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
            
                {/* Add Review Status Banner - Approved */} 
            {(p.approved_status === 'Approved for External Use' || p.approved_status === 'Approved for Internal Use') && (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-green-700">
                                <strong>Approval Status:</strong> This project is <strong>{p.approved_status}</strong>
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
    
                {/* Add Review Status Banner  - Archived*/}    
            {p.approved_status === 'Archived' && (
                <div className="bg-gray-100 border-l-4 border-gray-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-700">
                                            <strong>Approval Status:</strong> This project is <strong>{p.approved_status}</strong>
                                        </p>
                                    </div>  
                    </div>
                </div>
            )}
                                    
                                        
            {/* Buttons */}
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md"> {/* Main container */}
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

                        {permissions.reviewer && (
                        <Link
                            href={`/dashboard/projects/review/${id}`}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            Review Project
                        </Link>

                        
                        <ArchiveProjectButton projectId={id} />


                        )}


                        {permissions.admin && (

                        <Link href={`/dashboard/projects/${id}/audit`}>
                            <Button className="bg-gray-800 hover:bg-gray-600 hover:text-white">
                                Activity Log
                            </Button>
                        </Link>
                        )}
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
                            <li><b>Primary Commodity:</b> {cp.map((c) => { return (<span key={c.commodity_id}>{c.isecondary ? `${c.commodity_name}` : <></>}</span>)})}</li>
                            <li><b>Secondary Commodity:</b> {cp.map((c) => { return (<span key={c.commodity_id}>{c.issecondary ? `${c.commodity_name}` : <></>}</span>)})}</li>
                            <li><b>Project Status:</b> {p.project_status}</li>
                            <li><b>Approval Status:</b> {p.approved_status}</li>
                            <li><b>Company:</b> {project_companies.map((c) => { return (<p>{c.company_name}</p>)})} </li>
                        </ul>
                    </div>


                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Metadata</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    href="/dashboard/keyevents" 
                                    className="hover:underline"
                                >
                                    <b>Last Key Event:</b> {key_events.length > 0 ? `${key_events[0].event_date.toLocaleDateString()} - ${key_events[0].event_details}` : 'No key events available'}
                                </Link>
                            </li>
                            <li><b>Created at:</b> {p.created_at?.toLocaleString()}</li>
                            <li><b>Created by:</b> {p.created_by || 'Error No creator?'}</li>
                            <li><b>Updated at:</b> {p.updated_at?.toLocaleString()}</li>
                            <li><b>Last Approved by:</b> {p.approved_by || 'Not approved'}</li>
                            <li><b>Last Approval at:</b> {p.approved_at?.toLocaleString()}</li>
                            <li><b>Last Edit By: </b> {p.updated_by || 'Never Updated'}</li>
                            <li><b>Review By: </b> {p.reviewed_by || 'Never Reviewed'}</li>
                        </ul>
                    </div>
                </div>

                <hr className="my-3 border-black"/>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h2>Companies</h2>
                    <div className="flex flex-row items-start gap-2">
                    <form action={AddProjectCompany}>
                        <fieldset className="bg-gray-100 rounded-lg border-none flex flex-col"><legend>Link Company to Project</legend>
                        <input id="project_id" name="project_id" required readOnly hidden value={p.project_id}></input>
                        <select id="company_id" defaultValue="" required name="company_id">
                        <option  value="" disabled >Select your option</option>
                            {filtered_companies.map((company:any) => {
                            return (
                            <option key={company.company_id} value={company.company_id}>{company.company_name}</option>
                            )
                            })}
                        </select>
                        <div className="flex flex-row gap-2">
                            <button type="submit" className="p-2 my-2 bg-blue-500 text-white rounded-lg w-full">Add</button>
                            <button type="reset" className="p-2 my-2 bg-gray-500 text-white rounded-lg w-full">Clear</button>
                        </div>
                        </fieldset>
                    </form>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                        {project_companies.map((pc) => {
                            return (
                                <div key={pc.company_id} className="bg-gray-200 p-3 rounded-lg flex flex-row justify-between gap-2">
                                    
                                        <Link href={`/dashboard/companies/${pc.company_id}`} className="text-blue-600 hover:underline">
                                            <strong>{pc.company_name}</strong>
                                        </Link>
                                        <small>
                                        {pc.asx_code ? `$${pc.asx_code}` : ``}</small>
                                        <RemoveCompanyRef projectId={p.project_id} companyID={pc.company_id} />
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">

                    <p><strong>Note:  Changes to the Projects Commodities will reset the review status.</strong></p>
                </div>

                <div className="mb-6 flex flex-row items-start gap-2">
                    <form action={AddProjectCommodity}>
                        <fieldset className="bg-gray-50 rounded-lg border-none flex flex-col"><legend>Add Commoditity to Project</legend>
                        <input id="project_id" name="project_id" required readOnly hidden value={p.project_id}></input>
                        <select id="commodity" defaultValue="" required name="commodity">
                        <option  value="" disabled >Select your option</option>
                            {filtered_commod.map((commod) => {
                            return (
                            <option key={commod.commodity_id} value={commod.commodity_id}>{commod.commodity_name}</option>
                            )
                            })}
                        </select>
                        <div className="flex flex-row items-center gap-2">
                            <input type="radio" id="primary" name="primary_or_secondary" value="primary"  required /><label htmlFor="primary">Primary</label>
                            <input type="radio" id="secondary" name="primary_or_secondary" value="secondary" required /><label htmlFor="secondary">Secondary</label>    
                        </div>
                        <div className="flex flex-row gap-2">
                            <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg w-full">Add</button>
                            <button type="reset" className="p-2 bg-gray-500 text-white rounded-lg w-full">Clear</button>
                        </div>
                        </fieldset>
                    </form>


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

                <div className="flex flex-row my-2 gap-2 rounded-md">
                    <div className="w-1/2 p-3 bg-gray-200 rounded-md">
                        <h3>Reserves</h3>
                        {pReserves.map((r) => {
                            return (
                                <ProjectReserves
                                    key={r.commodity_id}
                                    project_id={r.project_id}
                                    commodity_id={r.commodity_id}
                                    commodity_name={r.commodity_name} 
                                    tonnage={r.tonnage}
                                    units_of_measurement={r.units_of_measurement}
                                    estimate_date={r.estimate_date}
                                    grade={r.grade}
                                    notes={r.notes}
                                    updated_at={r.updated_at}
                                />
                            )
                        })}
                    </div>
                    <div className="w-1/2 p-3 bg-gray-200 rounded-md">
                        <h3>Productions</h3>
                        {pProduction.map((r) => {
                            return (
                                <ProjectProductions
                                    key={r.commodity_id}
                                    project_id={r.project_id}
                                    commodity_id={r.commodity_id}
                                    commodity_name={r.commodity_name}
                                    tonnage={r.tonnage}
                                    units_of_measurement={r.units_of_measurement}
                                    start_date={r.start_date}
                                    end_date={r.end_date}
                                    notes={r.notes}
                                    updated_at={r.updated_at}
                                />
                            )
                        })}
                    </div>
                </div>


                <div className="mb-6"> {/* Attachments */}
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
                            <UploadAttachmentForm projectId={id}
                                        userId={session?.user?.name || ''} // Pass the user ID from the session if available
                            />
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
                    <details className="group [&_summary::-webkit-details-marker]:hidden"> {/* Key Events */}
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


                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h2>Comments</h2>
                    <CreateComment session={session} project_id={p.project_id} />
                    <ProjectComments project_id={p.project_id} />
                </div>


                <Link href="/dashboard/projects">
                    <Button>
                        Back to Projects
                    </Button>
                </Link>

            </div>
        </main>
    );
}