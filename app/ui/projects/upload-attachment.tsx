'use client';

import { useFormState } from 'react-dom';
import { createAttachment } from '@/app/lib/actions';

export default function UploadAttachmentForm({ projectId }: { projectId: string }) {
  const [state, formAction] = useFormState(createAttachment, null);

  return (
    <form action={formAction} className="space-y-4 mb-6">
      <input type="hidden" name="project_id" value={projectId} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="link_name" className="block text-sm font-medium text-gray-700 mb-1">Link Name</label>
          <input 
            type="text" 
            id="link_name" 
            name="link_name" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="link_url" className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
          <input 
            type="url" 
            id="link_url" 
            name="link_url" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="file_name" className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
          <input 
            type="text" 
            id="file_name" 
            name="file_name" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="file_url" className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
          <input 
            type="url" 
            id="file_url" 
            name="file_url" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea 
          id="notes" 
          name="notes" 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Upload Attachment
      </button>
      {/* Display success or error message */}
      {state?.success === false && (
        <p className="mt-2 text-sm text-red-600">{state.message}</p>
      )}
      {state?.success === true && (
        <p className="mt-2 text-sm text-green-600">{state.message}</p>
      )}
    </form>
  );
}