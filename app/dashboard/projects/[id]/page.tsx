import { fetchProjectById, fetchProjectsCommoditites } from "@/app/lib/data";
import { fetchKeyEventsByProjectID } from "@/app/lib/fetchdb/fetch-keyevents";
import Databox from "@/app/ui/devtools/databox";

export default async function Page(props: { params: Promise<{id: string}>}) {
    const params = await props.params;

    const [p] = await fetchProjectById(params.id);
    const cp = await fetchProjectsCommoditites(params.id);

    const key_events = await fetchKeyEventsByProjectID(params.id);

    return (
        <main>
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
                    <li>Created at: {p.created_at.toString()}</li>
                    <li>Created by: {p.created_by}</li>
                    <li>Updated at: {p.updated_at.toString()}</li>
                    <li>Approved by: {p.approved_by}</li>
                    <li>Approved at: {p.approved_at.toString()}</li>
                </ul>
            </small>

            <hr className="my-3 border-black" />


            <h3>Commodity</h3>
            {cp.map((cp) => {
                let val:string = ""
                if (cp.isprimary) val = val.concat(val, "Primary");
                if (cp.issecondary) val = val.concat(val, "Secondary");
                val = ` - ${val} Commodity`
                return (
                    <div key={cp.commodity_id}>
                        <p><a href="#"><strong>{cp.commodity_name}</strong></a>{val}</p>
                    </div>
                )
            })}
            <Databox rawData={cp} />
            <hr />

            <hr className="my-3 border-black" />
            <h3>Key Events</h3>
            {/* Displays key events, if there aren't any, display a meaningful message */}
            {key_events[0]!=null ? key_events.map((k) => {
                return (
                    <div key={k.event_id}>
                        <p>{k.event_date.toLocaleDateString()} - <strong>{k.event_details}</strong></p>
                    </div>
                )
            }) : (<p>No key events</p>)}
            <Databox rawData={key_events} />
        </main>
    )
}