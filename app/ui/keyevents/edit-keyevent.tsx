'use client'

import { updateKeyEvent } from "@/app/lib/writedb/write-keyevents";
import { KeyEventForm } from "@/app/lib/definitions";

// Define types for project options
type ProjectOption = {
    project_id: string;
    project_name: string;
};

type EditFormProps = {
    keyevent: KeyEventForm;
    projectOptions: ProjectOption[];
};

export default function EditKeyEventForm({ keyevent, projectOptions }: EditFormProps) {
    const updateEventByID = updateKeyEvent.bind(null, keyevent.event_id);
    const initialDate = keyevent.event_date.toISOString().split('T')[0];

    return (
        <form action={updateEventByID}>
            <h2 className="text-xl font-semibold mb-4">Editing event for: {keyevent.project_name}</h2>

            <fieldset>
                <legend>Required</legend>

                <label>Event Name</label>
                <input
                    type="text"
                    id="event_name"
                    name="event_name"
                    defaultValue={keyevent.event_name}
                    required
                />

                <label>Event Date</label>
                <input
                    type="date"
                    id="event_date"
                    name="event_date"
                    defaultValue={initialDate}
                    required
                    className="w-fit"
                />

                <label>Event Details</label>
                <textarea
                    id="event_details"
                    name="event_details"
                    defaultValue={keyevent.event_details}
                    className="w-full"
                    required
                />

                <label>Source/URL</label>
                <input
                    type="text"
                    id="event_source"
                    name="event_source"
                    defaultValue={keyevent.event_source}
                />

                <label>Related Project</label>
                    <select id="project_id" name="project_id">
                        {projectOptions.map((p) => (
                            <option key={p.project_id} value={p.project_id}>{p.project_name}</option>
                        ))}
                    </select>
                </fieldset>

            <button type="submit" className="fluent-primary-button mt-4">
                Edit KeyEvent
            </button>
        </form>
    );
}
