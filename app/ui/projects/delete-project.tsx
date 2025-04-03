'use client';

import { useState } from 'react';
import { deleteProject } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this project?')) {
      setIsDeleting(true);
      try {
        await deleteProject(projectId);
        // Redirect to the projects list page after successful deletion
          router.push(`/dashboard/projects/`);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      style={{
        backgroundColor: 'red',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {isDeleting ? 'Deleting...' : 'Delete Project'}
    </button>
  );
}