// app/ui/projects/review-project.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateProjectReviewStatus } from '@/app/lib/actions';

const REVIEW_STATUS_OPTIONS = [
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'not_approved', label: 'Not Approved' },
    { value: 'new', label: 'New' }
];

export default function ReviewProjectForm({ project }: { project: any }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        project_id: project.project_id,
        approved_status: project.approved_status,
        review_notes: project.review_notes || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProjectReviewStatus(formData);
            router.push(`/dashboard/projects/${project.project_id}`);
        } catch (error) {
            console.error('Error updating project review:', error);
            alert('Failed to update project review. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="approved_status" className="block text-sm font-medium text-gray-700 mb-1">
                        Review Status
                    </label>
                    <select
                        id="approved_status"
                        name="approved_status"
                        value={formData.approved_status}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        {REVIEW_STATUS_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="review_notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Review Notes
                    </label>
                    <textarea
                        id="review_notes"
                        name="review_notes"
                        rows={4}
                        value={formData.review_notes}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add any review comments or notes..."
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => router.push(`/dashboard/projects/${project.project_id}`)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
}