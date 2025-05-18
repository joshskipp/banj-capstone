// app/ui/projects/edit-form.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateProject } from '@/app/lib/actions';
import { Button } from "@/app/ui/button"; 
import { PlusCircleIcon } from "@heroicons/react/24/outline"; // Reusing this icon for consistency
import Link from 'next/link';


const PROJECT_STATUS_OPTIONS = [
  'Publicly announced',
  'Definitive feasibility',
  'Committed',
  'Completed'
];
const APPROVED_STATUS_OPTIONS = [
  { value: 'Update in Progress', label: 'Update in Progress' },
  { value: 'Ready for review', label: 'Ready for Review' }

];
export default function EditProjectForm({ project, reviewerName, session }: { 
  project: any, session: any;
  reviewerName: string;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    project_id: '',
    project_name: '',
    // asx_code: '',
    latitude: '',
    longitude: '',
    primary_commodity: '',
    secondary_commodity: '',
    product: '',

    project_status: 'Publicly announced',
    approved_status: 'Update in Progress',
    updated_by: reviewerName,
    updated_at: new Date().toISOString()
  });

  const user_session = session;
  console.log(user_session.id);
  useEffect(() => {
    if (project) {
      setFormData({
        project_id: project.project_id,
        project_name: project.project_name || '',
        // asx_code: project.asx_code || '',
        latitude: project.latitude?.toString() || '',
        longitude: project.longitude?.toString() || '',
        primary_commodity: project.primary_commodity || '',
        secondary_commodity: project.secondary_commodity || '',
        product: project.product || '',
        project_status: project.project_status || 'Publicly announced',
        approved_status: project.approved_status || 'Update in Progress',

        updated_by: reviewerName,
        updated_at: new Date().toISOString()
     });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Running function updateProject");
      await updateProject({
        ...formData,
        approved_status: formData.approved_status,
        updated_by: reviewerName // Pass the editors's name as a prop
      }, user_session.id);
      console.log("Redirect");
      router.push(`/dashboard/projects/${project.project_id}`);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!project) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={handleSubmit} className="p-6 mt-6 border-black rounded-[4px] border-2 max-w-4xl w-full bg-[#f8f5f6]">
        <div className="flex flex-col gap-6">

          {/* Required Section */}
          <fieldset>
            <legend className="font-semibold mb-4 text-lg">Required</legend>

            <label htmlFor="project_name" className="block mb-1">Project Name*</label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              required
              placeholder="Enter Project Name"
              className="w-full p-2 border rounded"
            />

            <label htmlFor="latitude" className="block mt-4 mb-1">Latitude</label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
              step="any"
              placeholder="Enter Latitude"
              className="w-full p-2 border rounded"
            />

            <label htmlFor="longitude" className="block mt-4 mb-1">Longitude</label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
              step="any"
              placeholder="Enter Longitude"
              className="w-full p-2 border rounded"
            />

           
            <label htmlFor="project_status" className="block mt-4 mb-1">Project Status</label>
            <select
              id="project_status"
              name="project_status"
              value={formData.project_status}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              {PROJECT_STATUS_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <label htmlFor="approved_status" className="block mt-4 mb-1">Review Status</label>
            <select
              id="approved_status"
              name="approved_status"
              value={formData.approved_status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              {/* Will change the review status upon edit */}
              {APPROVED_STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            </select>

          </fieldset>

          {/* Optional Section - Removed during development, may be added easily depending on Department needs */}
          {/* <fieldset>
            <legend className="font-semibold mb-4 text-lg">Optional</legend>
          </fieldset> */}

          {/* Submit Button */}
          <Button type="submit" className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
            <PlusCircleIcon className="w-6" />
            Update Project
          </Button>

        </div>
        
      </form>
    
    </div>
  );
}
