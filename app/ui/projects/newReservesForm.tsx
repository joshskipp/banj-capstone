'use client';
import { Button } from '@/app/ui/button'
import { writeReserves } from '@/app/lib/writedb/write-projects'
import { useSession } from "next-auth/react"

// @ts-ignore
export default function NewReservesForm( {project_id, commodities, session} : {project_id:string, commodities:any, session:any },

) {
    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    };

    const addReserves = writeReserves.bind(null, {project_id: project_id, user_id: user.id});
    return (
        <div>
            <form className="" action={addReserves}>
                <label>Commodity</label>
                <select id="cmod" name="cmod" className="w-1/4 border-1 border-black p-[0px] pl-2">
                    {commodities.map((cp: any) => {
                        return (
                            <option key={cp.commodity_id}
                                    value={cp.commodity_id}>{cp.commodity_name}</option>
                        )
                    })}
                </select>
                <label>Tonnage</label>
                <input id="tonnage"  name="tonnage" type="string"></input>
                <label>Units of Measure</label>
                <input id="units_of_measurement" name="units_of_measurement" type="string"></input>
                <label>Grade</label>
                <input id="grade" name="grade" type="string"></input>
                <label>Estimate Date</label>
                <input id="estimate_date" name="estimate_date" type="date"></input>
                <label>Notes</label>
                <textarea id="notes" name="notes"></textarea>
                <Button className="" type="submit">Submit</Button>
            </form>
            <textarea className={"text-[9pt] my-2 font-mono w-full bg-gray-200"} readOnly value={`This data will be recorded under: ${user.name} with id ${user.id}\nSession data: ${JSON.stringify(user)}`}>
            </textarea>

        </div>)
}