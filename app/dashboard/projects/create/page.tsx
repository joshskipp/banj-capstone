import CreateProjectForm from "@/app/ui/projects/create-project";
import Link   from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Create Project</h1>
            <CreateProjectForm />
            <Link href="/dashboard/projects">Back to Projects</Link>
        </div>
    )
}
