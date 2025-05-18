//app/ui/commodities/create-commodity.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCommodity } from '@/app/lib/actions';
import { Button } from "@/app/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const UNITS_OF_MEASURE_OPTIONS = [
  'm³',
  'kg',
  'oz',
  'lb',
  'Ton',
  'Tonnes',
  'g',
  't',
  'carat',
  'mmbtu'
];

export default function CreateCommodityForm({ reviewerName, session }: { reviewerName: string; session: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    commodity_name: '',
    element: '',
    notes: '',
    units_of_measure: 'Tonnes',
    created_by: reviewerName || 'error-getting-USER',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();     
    await createCommodity(formData, session.id);
    router.push('/dashboard/commodities');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={handleSubmit} className="p-6 mt-6 border-black rounded-[4px] border-2 max-w-4xl w-full bg-[#f8f5f6]">
        <h2 className="text-xl font-bold mb-6">Create New Commodity</h2>
        
        <div className="flex flex-col gap-4">
          {/* Commodity Name */}
          <div>
            <label htmlFor="commodity_name" className="block mb-1">Commodity Name*</label>
            <input
              type="text"
              id="commodity_name"
              name="commodity_name"
              value={formData.commodity_name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Element Symbol */}
          <div>
            <label htmlFor="element" className="block mb-1">Element Symbol</label>
            <input
              type="text"
              id="element"
              name="element"
              value={formData.element}
              onChange={handleChange}
              maxLength={2}
              pattern="[A-Za-z]{1,2}"
              title="1-2 letter element symbol"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Units of Measure */}
          <div>
            <label htmlFor="units_of_measure" className="block mb-1">Units of Measure*</label>
            <select
              id="units_of_measure"
              name="units_of_measure"
              value={formData.units_of_measure}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              {UNITS_OF_MEASURE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block mb-1">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
              <PlusCircleIcon className="w-6" />
              Create Commodity
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}