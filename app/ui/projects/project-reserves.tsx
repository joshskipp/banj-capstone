'use client';

import { useState } from "react";
import { updateReserves } from "@/app/lib/writedb/write-commodities";

export default function ProjectReserves(r: {
    project_id: string;
    commodity_id: string;
    commodity_name: string;
    tonnage: number;
    units_of_measurement: string;
    grade: number;
    estimate_date: Date;
    notes: string;
    updated_at: Date;
}) {

    const [formData, setFormData] = useState(r);
    const [originalData, setOriginalData] = useState(r);
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

    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Convert numeric fields
        const convertedValue = 
          (name === 'tonnage' || name === 'grade')
            ? (value === '' ? '' : Number(value)) 
            : value;
        
        setFormData({
          ...formData,
          [name]: convertedValue
        });
      };

    return (
        <div key={r.commodity_id}>
            <form action={updateReserves}>
            <div className="grid grid-cols-2 p-[2px] border-[1px] border-gray-600">
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

                {/* Hidden fields for project and commodity ID */}
                <input hidden readOnly name="project_id" id="project_id" defaultValue={formData.project_id}></input>
                <input hidden readOnly name="commodity_id" id="commodity_id" defaultValue={formData.commodity_id}></input>

                <label>Tonnage</label>
                <input name="tonnage" id="tonnage" readOnly={!isEditing} defaultValue={formData.tonnage} className={`h-6 ${!isEditing ? "bg-gray-200" : ""}`}></input>
                
                <label>Units of Measure</label>
                <input name="units_of_measurement" id="units_of_measurement" readOnly={!isEditing} defaultValue={formData.units_of_measurement} className={`h-6 ${!isEditing ? "bg-gray-200" : ""}`}></input>
                
                <label>Grade</label>
                <input name="grade" id="grade" readOnly={!isEditing} defaultValue={formData.grade} className={`h-6 ${!isEditing ? "bg-gray-200" : ""}`}></input>
                
                <label>Estimate Date</label>
                <input type="date" name="estimate_date" id="estimate_date" defaultValue={formData.estimate_date?.toISOString().split('T')[0]} readOnly={!isEditing} className={`h-6 ${!isEditing ? "bg-gray-200" : ""}`}></input>
                
                <label className="col-span-2">Notes</label>
                <textarea name="notes" id="notes" readOnly={!isEditing} defaultValue={formData.notes} className={`h-24 text-sm col-span-2 ${!isEditing ? "bg-gray-200" : ""}`}></textarea>

                <label>Last modified:</label>
                <p suppressHydrationWarning >{formData.updated_at.toLocaleString()}</p>
            </div>
            </form>
        </div>
    )
}