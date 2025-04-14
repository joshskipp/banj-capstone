'use client';

import { UUID } from "crypto";

type formProps = {
    session: any;
    project_id: UUID
}

export default function CreateComment(
    {session, project_id} : formProps

) {
    const user_id = session.user.id;
    


    return (
        <div>
        <p>Writing comment as: {user_id} For project with ID {project_id}</p>
        <form>
            <fieldset>
                <legend>Add Comment</legend>
                <textarea className="w-full" placeholder="Add a comment"></textarea>
                <div className="flex flex-row justify-end gap-4">
                    <button type="reset" className="bg-slate-400 border-black border-[1px] p-2">Cancel</button>
                    <button type="submit" className="bg-blue-400 text-white border-black border-[1px] p-2">Comment</button>
                </div>
            </fieldset>
        </form>
        </div>
    )

}