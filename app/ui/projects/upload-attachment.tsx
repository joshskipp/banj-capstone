'use client';

import { useFormState } from 'react-dom';
import { createAttachment } from '@/app/lib/actions';

export default function UploadAttachmentForm({ projectId }: { projectId: string }) {
  const [state, formAction] = useFormState(createAttachment, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="project_id" value={projectId} />
      <div>
        <label htmlFor="link_name">Link Name:</label>
        <input type="text" id="link_name" name="link_name" required />
      </div>
      <div>
        <label htmlFor="link_url">Link URL:</label>
        <input type="url" id="link_url" name="link_url" required />
      </div>
      <div>
        <label htmlFor="file_name">File Name:</label>
        <input type="text" id="file_name" name="file_name" required />
      </div>
      <div>
        <label htmlFor="file_url">File URL:</label>
        <input type="url" id="file_url" name="file_url" required />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" name="notes" required />
      </div>
      <button type="submit">Upload Attachment</button>
      {/* Display success or error message */}
      {state?.success === false && <p style={{ color: 'red' }}>{state.message}</p>}
      {state?.success === true && <p style={{ color: 'green' }}>{state.message}</p>}
    </form>
  );
}