import {updateKeyEvent} from "@/app/lib/writedb/write-keyevents";
import {KeyEventForm} from "@/app/lib/definitions";
export default function Form(
    {keyevent}: {keyevent: KeyEventForm}
    ) {

    const updateEventByID = updateKeyEvent.bind(null, keyevent.event_id);
    const initalDate = (keyevent.event_date).toISOString().split('T')[0]
    return (
        <form action={updateEventByID} >
            <h2>Editing event for: {keyevent.project_name}</h2>
            <fieldset>
                <legend>Required</legend>
                {/*<input type="hidden" id="user_id" name="user_id" value={user_id} />*/}
                {/*<label>Project</label>*/}
                {/*<select id="project_id" name="project_id">*/}
                {/*    {projOptions.map((p) => (*/}
                {/*        <option key={p.project_id} value={p.project_id}>{p.project_name}</option>*/}
                {/*    ))}*/}
                {/*</select>*/}

                <label>Event Name</label>
                <input type='text' id={"event_name"} defaultValue={keyevent.event_name} name={"event_name"} />

                <label>Event Date</label>
                <input type="date" id="event_date" name="event_date" defaultValue={initalDate} required className={"w-fit"}></input>

                <label>Event Details</label>
                <textarea id={"event_details"} defaultValue={keyevent.event_details} name={"event_details"}></textarea>

                <label>Source/URL</label>
                <input type='text' id={"event_source"} defaultValue={keyevent.event_source} name={"event_source"}/>

                
            </fieldset>

            <button type="submit" className="fluent-primary-button">Create KeyEvent</button>
        </form>
    )
}