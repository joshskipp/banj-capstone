'use client';

import { useState } from 'react';
import { archiveProject } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function ArchiveProjectButton({ projectId }: { projectId: string }) {
  const [isArchiving, setIsArchiving] = useState(false);
  const router = useRouter();

  const handleArchive = async () => {
    if (confirm('Are you sure you want to archive this project?')) {
      setIsArchiving(true);
      try {
        await archiveProject(projectId);
        router.push('/dashboard/projects/');
      } catch (error) {
        console.error('Error archiving project:', error);
        alert('Failed to archive project. Please try again.');
      } finally {
        setIsArchiving(false);
      }
    }
  };

  return (
    <button
      onClick={handleArchive}
      disabled={isArchiving}
      style={{
        backgroundColor: 'gray',
        color: 'white',
        padding: '8px 16px',
        border: 'black solid 1px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '1rem'
      }}
    >
      {isArchiving ? 'Archiving...' : 'Archive Project'}
    </button>
  );
}