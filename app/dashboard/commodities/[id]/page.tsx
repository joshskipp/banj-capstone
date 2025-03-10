import { fetchCommodityById} from "@/app/lib/data";

export default async function Page(props: { params: Promise<{id: string}>}) {
    const params = await props.params;
    const [c] = await fetchCommodityById(params.id);

    return (
        <div>
            <h2>{c.commodity_name}</h2>
            <ul>
                <li><strong>ID:</strong> {c.commodity_id}</li>
                <li><strong>Element:</strong> {c.element}</li>
                <li><strong>Units of Measure:</strong> {c.units_of_measure}</li>
            </ul>
            <p>{c.notes}</p>

            <hr className="my-3 border-black" />
            <small>
                <ul>
                    <li>Created at: {c.created_at.toString()}</li>
                    <li>Created by: {c.created_by}</li>
                    <li>Updated at: {c.updated_at.toString()}</li>
                    <li>Approved by: {c.approved_by}</li>
                    <li>Approved at: {c.approved_at.toString()}</li>
                </ul>
            </small>
        </div>
    )
}