'use client'
import {addKeyEvent} from "@/app/lib/writedb/write-keyevents";

// Define types for project options:
type ProjectOption = {
    project_id: string;
    project_name: string;
}

type formProps = {
    projectOptions: ProjectOption[];
    session: any;
}

export default function CreateKeyEvent(
    {projectOptions, session}: formProps
) {
    const user_id = session.user.id;

    const projOptions = projectOptions;

    return (
        <form action={addKeyEvent} >
            
            <fieldset>
                <legend>Required</legend>
                <input type="hidden" id="user_id" name="user_id" value={user_id} />

                <label>Event Name</label>
                <input type='text' id={"event_name"} name={"event_name"} />
                
                <label>Event Date</label>
                <input type="date" id="event_date" name="event_date" required className={"w-fit"}/>

                <label>Event Details</label>
                <input type='text'  id={"event_details"} name={"event_details"} />

                <label>Source/URL</label>
                <input type='text' id={"event_source"} name={"event_source"}/>

                <label>Related Project</label>
                <select id="project_id" name="project_id">
                    {projOptions.map((p) => (
                        <option key={p.project_id} value={p.project_id}>{p.project_name}</option>
                    ))}
                </select>
            </fieldset>

            <button type="submit" className="fluent-primary-button mt-4">Create Key Event</button>
        </form>
    )
}