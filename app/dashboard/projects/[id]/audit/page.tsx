import { fetchProjectById } from '@/app/lib/data';
import { fetchAudit } from '@/app/lib/fetchdb/fetch-audit';
import Link from 'next/link';
export default async function Page(props: { params: Promise<{id: string}>}) {
    const params = await props.params;
    const id = params.id;
    
    const project = await fetchProjectById(id);
    const audit = await fetchAudit(id);
    if (audit instanceof Error) {
        return <div>Error loading audit history</div>;
    }
    
    
    return (
    <div>
        <h2>Audit History for <em><Link className="text-blue-500 hover:text-blue-700 hover:underline" href={`/dashboard/projects/${id}`}>{project.project_name}</Link></em></h2>
        <p>Audit history is a record of all changes made to the project. It is useful for tracking changes and for debugging.</p>
        
        <div className='flex flex-col gap-2 p-2'>
        {audit.length == 0 ? (
                    <p>No audit history found</p>
                ) : (
                    
                    audit.map((record: any) => (
                        
                    <div className='flex flex-col px-[.2rem] pt-[.4rem] pb-0; bg-white border-[.1rem] border-solid border-[#bfbfbf] border-l-[0.5rem]' key={record.audit_id}>
                        <div className='flex flex-row gap-2 border-b-[.1rem] border-dashed border-[#bfbfbf]'>
                            <p>Changed by: <strong>{record.name}</strong></p>
                            <p>Changed at: <strong>{new Date(record.timestamp).toLocaleString()}</strong></p>
                        </div>
                        <p><strong>Fields affected:</strong><br /> {JSON.stringify((JSON.parse(record.data).fields_affected), null, 2)}</p>
                        <div className='flex flex-row justify-between gap-[0.2rem]'>
                            <div className='w-1/2'>
                                <p><strong>Old values:</strong></p>
                                <textarea className='w-full h-32 p-[0.2rem] border-[.05rem] border-solid border-[#bfbfbf] text-xs' readOnly
                                    value={JSON.stringify((JSON.parse(record.data).previous_value), null, 2)}>
                                </textarea>
                            </div>
                            <div className='w-1/2'>
                            <p><strong>New values:</strong></p>
                            <textarea className='w-full h-32 p-[0.2rem] border-[.05rem] border-solid border-[#bfbfbf] text-xs' readOnly
                                value={JSON.stringify((JSON.parse(record.data).new_value), null, 2)}>
                            </textarea>
                            </div>
                        </div>
                    </div>

            ))
            )}
            </div>
        
        <hr />
        {/* <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Date</th>
                    <th>Fields Affected</th>
                    <th>Old Value</th>
                    <th>New Value</th>
                </tr>
            </thead>
            <tbody>
                {audit.length == 0 ? (
                    <tr>
                        <td colSpan={5}>No audit history found</td>
                    </tr>
                ) : (
                    audit.map((record: any) => (
                        <tr key={record.audit_id}>
                        <td>{record.name}</td>
                        <td>{new Date(record.timestamp).toLocaleString()}</td>
                        <td>
                            <textarea className='w-full h-24 bg-gray-100 p-2 rounded-md' readOnly
                                value={JSON.stringify((JSON.parse(record.data).fields_affected), null, 2)}>
                            </textarea>
                            </td>
                        <td>
                            <textarea className='w-full h-24 bg-gray-100 p-2 rounded-md' readOnly
                                value={JSON.stringify((JSON.parse(record.data).old_value), null, 2)}>
                            </textarea>
                        </td>
                        <td>
                            <textarea className='w-full h-24 bg-gray-100 p-2 rounded-md' readOnly
                                value={JSON.stringify((JSON.parse(record.data).new_value), null, 2)}>
                            </textarea>
                        </td>
                        
                    </tr>
                )))}
            </tbody>
        </table> */}
    </div>
)
}