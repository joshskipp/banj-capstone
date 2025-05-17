import {updateKeyEvent} from "@/app/lib/writedb/write-keyevents";
import {KeyEventForm} from "@/app/lib/definitions";
import Link from "next/link";
export default function Form(
    {keyevent}: {keyevent: KeyEventForm}
    ) {

    const updateEventByID = updateKeyEvent.bind(null, keyevent.event_id);
    const initalDate = (keyevent.event_date).toISOString().split('T')[0]
    return (
        <form action={updateEventByID} >
            <main className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">Editing Event for Project: {keyevent.project_name}

                <fieldset>
                    <legend>Required</legend>
                    <div className="flex justify-between items-start mb-6">
                        <h2> Editing Event for Project: {keyevent.project_name}</h2>
                        <Link href={"/dashboard/keyevents/"}>
                            <button className={"fluent-default-button"}>Back</button>
                        </Link>
                    </div>

                    <label>Event Name</label>
                    <input type='text' id={"event_name"} defaultValue={keyevent.event_name} name={"event_name"} />

                    <label>Event Date</label>
                    <input type="date" id="event_date" name="event_date" defaultValue={initalDate} required className={"w-fit"}></input>

                    <label>Event Details</label>
                    <textarea id={"event_details"} defaultValue={keyevent.event_details} name={"event_details"}></textarea>

                    <label>Source/URL</label>
                    <input type='text' id={"event_source"} defaultValue={keyevent.event_source} name={"event_source"}/>

                    
                </fieldset>

                <button type="submit" className="fluent-primary-button mt-4">Edit Key Event</button>

            </main>
        </form>
    )
}