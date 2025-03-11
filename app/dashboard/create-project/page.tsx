'use client'; // Mark this as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '../../lib/actions';
import Link from 'next/link';

export default function CreateProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    project_name: '',
    latitude: '',
    longitude: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call the createProject action
    const result = await createProject(formData);

    if (result.success) {
      router.push('/dashboard/projects'); // Redirect to the projects list page
    } else {
      console.error('Failed to create project:', result.error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="project_name">Project Name:</label>
          <input
            type="text"
            id="project_name"
            name="project_name"
            value={formData.project_name}
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
            value={formData.latitude}
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
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
      <Link href="/dashboard/projects">Back to Projects</Link>
    </div>
  );
}