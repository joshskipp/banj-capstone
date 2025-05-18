import {fetchKeyEventByID} from "@/app/lib/fetchdb/fetch-keyevents"
import Form from "@/app/ui/keyevents/edit-keyevent"
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [keyEvents] = await fetchKeyEventByID(id);

    const event = {
        event_id: keyEvents.event_id,
        event_name: keyEvents.event_name,
        event_date: keyEvents.event_date,
        event_details: keyEvents.event_details,
        event_source: keyEvents.event_source,
        project_id: keyEvents.project_id,
        project_name: keyEvents.project_name,
    }
    return (
        <main>
            <Form keyevent={event} />

        </main>
    )
}