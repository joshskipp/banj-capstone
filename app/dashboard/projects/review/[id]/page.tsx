// app/dashboard/projects/review/[id]/page.tsx
import { fetchProjectById } from "@/app/lib/data";
import ReviewProjectForm from "@/app/ui/projects/review-project";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/app/ui/button";

export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;
    const project = await fetchProjectById(id);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Review Project: {project.project_name}</h1>
            <ReviewProjectForm project={project} />
            <br />
            <Link href={`/dashboard/projects/${id}`}>
                <Button>
                    Back to Project
                </Button>
            </Link>
        </div>
    );
}