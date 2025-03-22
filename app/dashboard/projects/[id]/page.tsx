import { fetchProjectById, fetchProjectsCommoditites } from "@/app/lib/data";
import DeleteProjectButton from "@/app/ui/projects/delete-project";
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  // Fetch the project and its commodities
  const p = await fetchProjectById(params.id);
  const cp = await fetchProjectsCommoditites(params.id);

  // If the project is not found, show a 404 page
  if (!p) {
    notFound();
  }

  return (
    <div>
      <h2>{p.project_name}</h2>
      <small>{p.project_id}</small>
      <ul>
        <li><b>Product:</b> {p.product}</li>
        <li><b>Latitude:</b> {p.latitude}</li>
        <li><b>Longitude:</b> {p.longitude}</li>
      </ul>

      <hr className="my-3 border-black" />
      <small>
        <ul>
          <li>Created at: {p.created_at?.toString()}</li>
          <li>Created by: {p.created_by}</li>
          <li>Updated at: {p.updated_at?.toString()}</li>
          <li>Approved by: {p.approved_by}</li>
          <li>Approved at: {p.approved_at?.toString()}</li>
        </ul>
      </small>

      <hr className="my-3 border-black" />
      <p>{JSON.stringify(cp)}</p>

      <h3>Commodity</h3>
      {cp.map((cp) => {
        let val: string = "";
        if (cp.isprimary) val = val.concat(val, "Primary");
        if (cp.issecondary) val = val.concat(val, "Secondary");
        val = ` - ${val} Commodity`;
        return (
          <div key={cp.commodity_id}>
            <p>
              <a href="#">
                <strong>{cp.commodity_name}</strong>
              </a>
              {val}
            </p>
          </div>
        );
      })}
      <DeleteProjectButton projectId={params.id} />
    </div>
  );
}