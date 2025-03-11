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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <div>
            <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Project
            </button>
            <Link
              href="/dashboard/projects"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
