import { notFound } from 'next/navigation';
import { fetchProjectById } from '../../../lib/data';
import Link from 'next/link';


export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = await fetchProjectById(params.id);

  if (!project) {
    notFound(); // Show a 404 page if the project is not found
  }

  return (
    <div>
      <h1>Project Details</h1>
      <h2>{project.project_name}</h2>
      <p>Latitude: {project.latitude}</p>
      <p>Longitude: {project.longitude}</p>
      <Link href="/dashboard/projects">Back to Projects</Link>
    </div>
  );
}