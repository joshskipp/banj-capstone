"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, themeQuartz, ClientSideRowModelModule } from "ag-grid-community";
// import { ClientSideRowModelModule, ExcelExportModule } from "ag-grid-enterprise"; 
import { fetchAllProjects } from "@/app/lib/data";
import { redirect } from "next/navigation";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]); 

const GridComponent = () => {
    const [rowData, setRowData] = useState<any[]>([]);
    const gridRef = useRef<AgGridReact>(null); // Add a ref for the grid

    useEffect(() => {
        fetchAllProjects()
            .then(data => setRowData(data))
            .catch(error => console.error('Failed to fetch rowData:', error));
    }, []);

    const gridOptions = {
        onRowClicked: (event: { data: { project_id: any; }; }) => { redirect(`/dashboard/projects/${event.data.project_id}`); }
    };

    const [columnDefs] = useState<ColDef[]>([
        { field: "project_id", width: 100, headerName: "ID" },
        { field: "project_name", width: 300, headerName: "Project Name", sortable: true },
        { field: "latitude", maxWidth: 120, sortable: true },
        { field: "longitude", maxWidth: 120, sortable: true },
        { field: "updated_at", maxWidth: 150, headerName: "Last Updated", sortable: true },
        {field: "primary_commodity", maxWidth: 150, headerName: "Commodity", sortable: true },
        //{field: "secondary_commodity", maxWidth: 150, headerName: "Commodity- (Other)", sortable: true },
        {field: "approved_status", maxWidth: 150, headerName: "Approval", sortable: true }
    ]);

    // Function to export data to Excel
    const exportToExcel = () => {
        if (gridRef.current?.api) {
            gridRef.current.api.exportDataAsExcel();
        }
    };

    return (
        <div style={{ width: "100%", height: "70vh" }}>
            {/* Add Export to Excel Button */} <br />       
            <button
                onClick={exportToExcel}
                style={{
                    marginBottom: "10px",
                    padding: "8px 12px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Export to Excel
            </button>

            {/* AG Grid */}
            <div className="ag-theme-quartz" style={{ height: "100%", width: "100%" }}>
                <AgGridReact
                    ref={gridRef} // Add the ref to the grid
                    theme={themeQuartz}
                    gridOptions={gridOptions}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={14}
                    rowModelType="clientSide"
                />
            </div>
        </div>
    );
};

export default GridComponent;