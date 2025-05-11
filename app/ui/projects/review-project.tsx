// app/ui/projects/review-project.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateProjectReviewStatus } from '@/app/lib/actions';
// import { GetSession } from '@/app/lib/get-session';
// import { useSession } from 'next-auth/react';

const REVIEW_STATUS_OPTIONS = [
    { value: 'update in progress', label: 'Update in Progress' },
    { value: 'Ready for review', label: 'Ready for review' },
    { value: 'Under review', label: 'Under review' },
    { value: 'Reviewed', label: 'Reviewed' },
    { value: 'Approved for Internal Use', label: 'Approved for Internal Use' },
    { value: 'Approved for External Use', label: 'Approved for External Use' },
];

export default function ReviewProjectForm({ 
    project,
    reviewerName 
}: { 
    project: any;
    reviewerName: string;
}) {
    
    const router = useRouter();
    // const currentSession = GetSession(); // Returns null if not logged in, otherwise gets Session.
    
    // const { data: session } = useSession(); // Ensure session is available for user info
    const [formData, setFormData] = useState({
        project_id: project.project_id,
        approved_status: project.approved_status,
        review_notes: project.review_notes || '',
        reviewed_by: reviewerName || 'error-getting-USER',
        approved_by: project.approved_by || null,
        approved_at: project.approved_at || null
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
        
        if (name === 'approved_status') {
            const isApproved = value === 'Approved for Internal Use' || value === 'Approved for External Use';
            setFormData({ 
                ...formData, 
                approved_status: value,
                approved_by: isApproved ? reviewerName || 'error-getting-USER' : null,
                approved_at: isApproved ? new Date().toISOString() : null
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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