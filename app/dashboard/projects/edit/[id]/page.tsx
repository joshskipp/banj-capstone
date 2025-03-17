'use client'; // Mark this as a Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState({
    project_id: params.id,
    project_name: '',
    latitude: '',
    longitude: '',
  });

  // Fetch project details on component mount
  useEffect(() => {
    fetch(`/query?id=${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.project_id) {
          setProject({
            project_id: data.project_id,
            project_name: data.project_name,
            latitude: data.latitude,
            longitude: data.longitude,
          });
        } else {
          console.error('Project not found');
        }
      })
      .catch((error) => console.error('Error fetching project:', error));
  }, [params.id]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/query', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: project.project_id,
          project_name: project.project_name,
          latitude: parseFloat(project.latitude),
          longitude: parseFloat(project.longitude),
        }),
      });

      if (response.ok) {
        router.push('/dashboard/projects'); // Redirect to the projects list page
      } else {
        console.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div>
      <h1>Edit Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="project_name">Project Name:</label>
          <input
            type="text"
            id="project_name"
            name="project_name"
            value={project.project_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={project.latitude}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={project.longitude}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Project</button>
      </form>
      <Link href="/dashboard/projects">Back to Projects</Link>
    </div>
  );
}
