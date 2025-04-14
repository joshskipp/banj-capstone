'use client';
import { createComment } from "@/app/lib/writedb/write-comment";
import { UUID } from "crypto";
import { Button } from "../button";

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
        <form action={(formData) => createComment({project_id, user_id}, formData)}>
            <fieldset>
                <legend>Add Comment</legend>
                <textarea className="w-full" name="comment" placeholder="Add a comment"></textarea>
                <div className="flex flex-row justify-end gap-1">
                    <Button type="reset" className="bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-black">Cancel</Button>
                    <Button type="submit">Comment</Button>
                </div>
            </fieldset>
        </form>
        </div>
    )

}