'use client';
import { Button } from '@/app/ui/button'
import { writeReserves } from '@/app/lib/writedb/write-projects'
import { useSession } from "next-auth/react"
import {useState} from "react";
import {updateProduction} from "@/app/lib/writedb/write-commodities";

// @ts-ignore
export default function ProjectProductions(prod: {
    project_id: string;
    commodity_id: string;
    commodity_name: string;
    tonnage: number;
    units_of_measurement: string;
    start_date: Date;
    end_date: Date;
    notes: string;
    updated_at: Date;
}) {

    const [formData, setFormData] = useState(prod);
    const [originalData, setOriginalData] = useState(prod);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleEditToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (isEditing) {
            // Save changes
            setIsSaving(true);
            setOriginalData(formData);
            setIsEditing(false);

        } else {
            // Enter edit mode
            setIsEditing(true);
        }
    };

    const handleCancel = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // Reset to original data
        setFormData(originalData);
        setIsEditing(false);
    };


    return (
        <div key={prod.commodity_id}>
            <form action={updateProduction}>
                <div className="grid grid-cols-2 p-2 bg-gray-100 mb-2">
                    <strong className={""}>{formData.commodity_name}</strong>

                    <div>
                        {isEditing ? (
                            <button onClick={(e: React.MouseEvent) => handleCancel(e as any)} className="fluent-primary-button">Cancel</button>
                        ) : <button
                            onClick={(e: React.MouseEvent) => handleEditToggle(e as any)}
                            className={`fluent-primary-button ${
                                isEditing
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "bg-blue-500 hover:bg-blue-600 text-white"
                            }`}
                        >
                            {isEditing ? "Save" : "Edit"}
                        </button>
                        }
                        {isEditing && (
                            <button type="submit" disabled={isSaving} className="fluent-primary-button bg-green-500 hover:bg-green-600 text-white">{(isSaving ? "Saving..." : "Save")}</button>
                        )}
                    </div>

                    <input hidden readOnly name="project_id" id="project_id" defaultValue={formData.project_id}></input>
                    <input hidden readOnly name="commodity_id" id="commodity_id" defaultValue={formData.commodity_id}></input>

                    <label>Tonnage</label>
                    <input name="tonnage" id="tonnage" readOnly={!isEditing} defaultValue={formData.tonnage} className={`text-xs ${!isEditing ? "bg-gray-200" : ""}`}></input>

                    <label>Units of Measure</label>
                    <input name="units_of_measurement" id="units_of_measurement" readOnly={!isEditing} defaultValue={formData.units_of_measurement} className={`text-xs ${!isEditing ? "bg-gray-200" : ""}`}></input>

                    <label>Start Date</label>
                    <input type="date" name="start_date" id="start_date" defaultValue={formData.start_date?.toISOString().split('T')[0]} readOnly={!isEditing} className={`text-xs ${!isEditing ? "bg-gray-200" : ""}`}></input>

                    <label>End Date</label>
                    <input type="date" name="end_date" id="end_date" defaultValue={formData.end_date?.toISOString().split('T')[0]} readOnly={!isEditing} className={`text-xs ${!isEditing ? "bg-gray-200" : ""}`}></input>

                    <label className="col-span-2">Notes</label>
                    <textarea name="notes" id="notes" readOnly={!isEditing} defaultValue={formData.notes} className={`h-24 text-xs col-span-2 ${!isEditing ? "bg-gray-200" : ""}`}></textarea>

                    <label className="p-2">Last modified:</label>
                    <p suppressHydrationWarning className="text-xs p-2" >{formData.updated_at.toLocaleString()}</p>

                </div>
            </form>
        </div>
    )
}