// app/ui/projects/create-project.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/app/lib/actions';
import { create } from 'domain';

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

const Review_STATUS_OPTIONS = [
  'Update in Progress',
  'Ready for Review'
]

const PROJECT_STATUS_OPTIONS = [
  'Publicly announced',
  'Definitive feasibility',
  'Committed',
  'Completed'
];

<<<<<<< HEAD
export default function CreateProjectForm({ reviewerName }: { reviewerName: string }) {
=======

export default function CreateProjectForm(session: any) {
>>>>>>> origin/preview
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
    created_by: ''
  });
  const user_session = session;
  console.log(user_session.session.name);

  const handleSubmit = async (e: React.FormEvent) => {
<<<<<<< HEAD
    e.preventDefault();
    await createProject({
      ...formData,
      created_by: reviewerName // Pass the creator's name
    });
=======
    e.preventDefault();     
    await createProject(formData, user_session.session.id);
>>>>>>> origin/preview
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="ml-4 mt-4 max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <div className="space-y-4">
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
          </div>

          {/* Coordinates */}
          <div className="space-y-4">
            <div>
              <label htmlFor="latitude" className="block mb-1">Latitude</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                // required
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
                // required
                step="any"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Commodities */}
          <div className="space-y-4">
            <div>
              <label htmlFor="primary_commodity" className="block mb-1">Primary Commodity*</label>
              <select
                id="primary_commodity"
                name="primary_commodity"
                value={formData.primary_commodity}
                onChange={handleChange}
                // required
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
          </div>

            {/* Product and Status */}
            <div className="space-y-4">
            <div>
              <label htmlFor="product" className="block mb-1">Product*</label>
              <input
              type="text"
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              // required
              className="w-full p-2 border rounded"
              />
            </div>
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
            {/* Ready for review */}
            <p>review</p>
            <div>
              <label htmlFor="review_status" className="block mb-1">Review Status</label>
              <select
                id="review_status"
                name="review_status"
                value={formData.approved_status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {Review_STATUS_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              </div>
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}