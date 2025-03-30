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
            <p>{JSON.stringify(session)} help</p>

            <fieldset>
                <legend>Required</legend>
                <input type="hidden" id="user_id" name="user_id" value={user_id} />
                <label>Project</label>
                <select id="project_id" name="project_id">
                    {projOptions.map((p) => (
                        <option key={p.project_id} value={p.project_id}>{p.project_name}</option>
                    ))}
                </select>

                <label>Event Date</label>
                <input type="date" id="event_date" name="event_date" required className={"w-fit"}></input>

                <label>Event Details</label>
                <textarea id={"event_details"} name={"event_details"}>

                </textarea>
            </fieldset>

            <button type="submit" className="fluent-primary-button">Create KeyEvent</button>
        </form>
    )
}