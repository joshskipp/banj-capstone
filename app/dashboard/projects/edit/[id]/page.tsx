import { fetchProjectById } from "@/app/lib/data";
import EditProjectForm from "@/app/ui/projects/edit-project";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/app/ui/button";
import { activeSession } from "@/app/lib/utils/activeSession";

export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;
    const project = await fetchProjectById(id); // Fetch the project
    const session = await activeSession();


  if (!project) {
    notFound(); // Show a 404 page if the project is not found
  }

  return (
    <div>
      <h1>DEVELOPMENT Edit Project</h1>
      <EditProjectForm project={project} session={session} />
      <br />
      <Link href="/dashboard/projects">
      <Button>
        Back to Projects
        </Button>
      </Link>
    </div>
  );
}