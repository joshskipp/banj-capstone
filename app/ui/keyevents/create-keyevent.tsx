'use client'
import { addKeyEvent } from "@/app/lib/writedb/write-keyevents";

// Define types for project options:
type ProjectOption = {
    project_id: string;
    project_name: string;
}

type formProps = {
    projectOptions: ProjectOption[];
}

export default function CreateKeyEvent(
    {projectOptions}: formProps
) {

    const projOptions = projectOptions;

    return (
        <form action={addKeyEvent}>
            <fieldset>
                <legend>Required</legend>
                <label>Project</label>
                <select id="project_id" name="project_id" >
                    {projOptions.map((p) => (
                        <option key={p.project_id} value={p.project_id}>{p.project_name}</option>
                    ))}
                </select>

                <label>Event Date</label>
                <input type="date" id="event_date" name="event_date" className={"w-fit"}></input>

                <label>Event Details</label>
                <textarea id={"event_details"} name={"event_details"}>

                </textarea>
            </fieldset>

            <button type="submit" className="fluent-primary-button">Create KeyEvent</button>
        </form>
)
}