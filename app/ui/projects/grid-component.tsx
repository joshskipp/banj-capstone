// components/GridComponent.tsx
"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, QuickFilterModule, ClientSideRowModelModule, GridOptions} from "ag-grid-community";
import { fetchAllProjects } from "@/app/lib/data";
import { redirect } from "next/navigation";
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, QuickFilterModule]);


const GridComponent = () => {
    const [rowData, setRowData] = useState<any[]>([]);

    useEffect(() => {
        fetchAllProjects()
            .then(data => setRowData(data))
            .catch(error => console.error('Failed to fetch rowData:', error));
    }, []);

    const gridOptions: GridOptions = {
        onRowClicked: (event: { data: { project_id: any; }; }) => { redirect(`/dashboard/projects/${event.data.project_id}`); }
    }
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: "project_id", width: 300, headerName: "ID"},
        { field: "project_name", width: 300, headerName: "Project Name", filter: "agTextColumnFilter", sortable: true},
        { field: "product", width: 300, headerName: "Product", filter: "agTextColumnFilter", sortable: true},
        { field: "latitude",  maxWidth: 120,  sortable: true},
        { field: "longitude", maxWidth: 120,  sortable: true},
        { field: "updated_at", maxWidth: 150, headerName: "Last Updated", filter: "agTextColumnFilter", sortable: true },
    ]);

    return (
        <div style={{ width: "100%", height: "80vh" }}>
            <AgGridReact gridOptions={gridOptions} rowData={rowData} columnDefs={columnDefs} />
        </div>
    );
};

export default GridComponent;
