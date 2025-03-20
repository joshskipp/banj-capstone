'use client'; 

import { useState } from 'react';
import { deleteProject } from '@/app/lib/actions'; 

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this project?')) {
      setIsDeleting(true);
      await deleteProject(projectId);
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