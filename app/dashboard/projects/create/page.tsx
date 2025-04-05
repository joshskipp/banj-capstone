import CreateProjectForm from "@/app/ui/projects/create-project";
import Link   from "next/link";
import { Button } from "@/app/ui/button";

export default function Page() {
    return (
        <div>
            <h1>Create Project</h1>
            <CreateProjectForm />
            <Link href="/dashboard/projects">
      <Button>
        Back to Projects
        </Button>
      </Link>
        </div>
    )
}
