'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateProject } from '@/app/lib/actions';

export default function EditProjectForm({ project }: { project: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    project_id: project?.project_id || '',
    project_name: project?.project_name || '',
    latitude: project?.latitude?.toString() || '',
    longitude: project?.longitude?.toString() || '',
  });

  // Initialize form data when project is available
  useEffect(() => {
    if (project) {
      setFormData({
        project_id: project.project_id,
        project_name: project.project_name,
        latitude: project.latitude?.toString() || '',
        longitude: project.longitude?.toString() || '',
      });
    }
  }, [project]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProject(formData);
      router.push('/dashboard/projects'); // Redirect after update
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Render a loading state if project is not available
  if (!project) {
    return <div>Loading...</div>;
  }

  return (
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
      <button type="submit">Update Project</button>
    </form>
  );
}