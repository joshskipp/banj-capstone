import Databox from "@/app/ui/devtools/databox";
import { fetchKeyEvents } from "@/app/lib/fetchdb/fetch-keyevents";
import KeyEventsGrid from "@/app/ui/keyevents/keyevents-grid";

export default async function Page() {
    const allKeyEvents = await fetchKeyEvents();

    return (
        <main>
            <h2>Key Events</h2>

            <KeyEventsGrid />
            <Databox rawData={allKeyEvents} />

        </main>
    )
}