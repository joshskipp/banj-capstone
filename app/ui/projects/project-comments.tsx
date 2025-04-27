
import { fetchComments } from "@/app/lib/fetchdb/fetch-comments";

export default async function ProjectComments({project_id}: {project_id: string}) {
   

    const comments = await fetchComments(project_id);

    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.comment_id} className="text-sm border-gray-300 border-[0.5px] bg-white border-l-4 pl-2">
                    <p><strong>{comment.name}</strong> <span className="text-gray-500">{comment.timestamp.toLocaleString()}</span></p>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    )
}