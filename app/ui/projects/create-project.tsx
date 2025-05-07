'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/app/lib/actions';
import { Button } from "@/app/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const COMMODITY_OPTIONS = [
  'Gold', 'Silver', 'Copper', 'Iron', 'Nickel',
  'Zinc', 'Lead', 'Uranium', 'Lithium', 'Cobalt'
];

const PRODUCT_OPTIONS = [
  'Graphite concentrate',
  'Silica sand',
  'Concentrate',
  'HPA equivalent',
  'Vanadium pentoxide',
  'Vanadium pentoxide, molybdenum oxide',
  'Vanadium pentoxide, high-purity alumina'
];

const REVIEW_STATUS_OPTIONS = [
  'Update in Progress',
  'Ready for Review'
];

const PROJECT_STATUS_OPTIONS = [
  'Publicly announced',
  'Definitive feasibility',
  'Committed',
  'Completed'
];

export default function CreateProjectForm({ reviewerName, session }: { reviewerName: string; session: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    project_name: '',
    asx_code: '',
    latitude: '',
    longitude: '',
    primary_commodity: '',
    secondary_commodity: '',
    product: '',
    project_status: 'Publicly announced',
    approved_status: 'Update in Progress',
    created_by: reviewerName || 'error-getting-USER',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();     
    await createProject(formData, session.id);
    router.push('/dashboard/projects');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f8f5f6]">
      <form onSubmit={handleSubmit} className="p-6 mt-6 border-black rounded-[4px] border-2 max-w-4xl w-full bg-[#f8f5f6]">
        <h2 className="text-xl font-bold mb-6">Create New Project</h2>
        
        <div className="flex flex-col gap-4">
          {/* Project Name */}
          <div>
            <label htmlFor="project_name" className="block mb-1">Project Name*</label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* ASX Code */}
          <div>
            <label htmlFor="asx_code" className="block mb-1">ASX Code</label>
            <input
              type="text"
              id="asx_code"
              name="asx_code"
              value={formData.asx_code}
              onChange={handleChange}
              maxLength={3}
              pattern="[A-Za-z]{3}"
              title="3-letter ASX code"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block mb-1">Latitude</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                step="any"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block mb-1">Longitude</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                step="any"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Commodities */}
          <div>
            <label htmlFor="primary_commodity" className="block mb-1">Primary Commodity*</label>
            <select
              id="primary_commodity"
              name="primary_commodity"
              value={formData.primary_commodity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select...</option>
              {COMMODITY_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="secondary_commodity" className="block mb-1">Secondary Commodity</label>
            <select
              id="secondary_commodity"
              name="secondary_commodity"
              value={formData.secondary_commodity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">None</option>
              {COMMODITY_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Product */}
          <div>
            <label htmlFor="product" className="block mb-1">Product*</label>
            <input
              type="text"
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Project Status */}
          <div>
            <label htmlFor="project_status" className="block mb-1">Project Status*</label>
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
          </div>

          {/* Review Status */}
          <div>
            <label htmlFor="approved_status" className="block mb-1">Review Status</label>
            <select
              id="approved_status"
              name="approved_status"
              value={formData.approved_status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              {REVIEW_STATUS_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <p>Leave field as 'Update In Progress' if project is in drafting stage.</p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
              <PlusCircleIcon className="w-6" />
              Create Project
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}