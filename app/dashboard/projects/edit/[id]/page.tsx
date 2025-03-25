import { fetchProjectById } from "@/app/lib/data";
import EditProjectForm from "@/app/ui/projects/edit-project";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/app/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const project = await fetchProjectById(params.id); // Fetch the project

  if (!project) {
    notFound(); // Show a 404 page if the project is not found
  }

  return (
    <div>
      <h1>DEVELOPMENT Edit Project</h1>
      <EditProjectForm project={project} />
      <br />
      <Link href="/dashboard/projects">
      <Button>
        Back to Projects
        </Button>
      </Link>
    </div>
  );
}