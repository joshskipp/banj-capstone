import {fetchKeyEventById} from "@/app/lib/data";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [k] = await fetchKeyEventById(id);

    return (
        <main className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{k.event_name}</h2>
                    <small className="text-gray-500">{k.event_id}</small>
                </div>
                <div className="flex space-x-2">
                        <Link
                            href={`/dashboard/keyevents/${k.event_id}/edit`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Edit Project
                        </Link>

                </div>
            </div>

            <div className="flex flex-col gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Metadata</h3>
                    <ul className="space-y-2 text-sm">
                        <li><b>Created at:</b> {k.created_at.toLocaleString()}</li>
                        <li><b>Created by:</b> {k.name}</li>
                        <li><b>Updated at:</b> {k.updated_at.toLocaleString()}</li>
                    </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Event Details</h3>
                    <ul className="space-y-2">
                        <li>{k.event_details}</li>
                    </ul>
                </div>
            </div>

            <hr className="my-3 border-black" />

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-3">Source/URL</h3>
                <p>
                    <a href={k.event_source} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {k.event_source}
                    </a>
                </p>
            </div>
        </main>
    );
}