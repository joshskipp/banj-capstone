// app/dashboard/projects/review/[id]/page.tsx
import { fetchProjectById } from "@/app/lib/data";
import ReviewProjectForm from "@/app/ui/projects/review-project";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/app/ui/button";
import { GetSession } from "@/app/lib/get-session";
import { activeSession } from "@/app/lib/utils/activeSession";
import { getPermissions } from "@/app/lib/utils/getPermissions";


export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;
    const project = await fetchProjectById(id);
    const session = await GetSession();
    const reviewerName = session?.name || 'error-getting-USER'; // Get the reviewer's name from the session

    const currentUser = await activeSession();
    const permissions = await getPermissions(currentUser?.id || "")

    if (!project) {
        notFound();
    }
     if (!permissions?.reviewer) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <p>You do not have permission to view this page.</p>
                <Link href={`/dashboard/projects/${id}`}>
                    <Button>
                        Back to Project
                    </Button>
                </Link>
            </div>
        );
    }
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Review Project: {project.project_name}</h1>
            <ReviewProjectForm 
                project={project} 
                reviewerName={session?.name || ''}  // Pass the reviewer's name as a prop
            />
            <Link href={`/dashboard/projects/${id}`}>
                {/* Use the Button component from your UI library */}
                <Button>
                    Back to Project
                </Button>
            </Link>
        </div>
    );
}