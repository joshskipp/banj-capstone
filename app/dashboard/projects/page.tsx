import Link from 'next/link';
import { fetchAllProjects } from '../../lib/data';

export default async function ProjectsPage() {
  const projects = await fetchAllProjects();

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.project_id}>
            <Link href={`/dashboard/projects/${project.project_id}`}>
              {project.project_name}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/dashboard/create-project">Create New Project</Link>
    </div>
  );
}