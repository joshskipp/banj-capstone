
import { fetchComments } from "@/app/lib/fetchdb/fetch-comments";

export default async function ProjectComments({project_id}: {project_id: string}) {
   

    const comments = await fetchComments(project_id);

    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.comment_id}>
                    <p>{comment.comment}</p>
                    <p>{comment.name}</p>
                </div>
            ))}
        </div>
    )
}