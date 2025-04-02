"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { fetchKeyEvents } from "@/app/lib/fetchdb/fetch-keyevents";
import { redirect } from "next/navigation";
ModuleRegistry.registerModules([AllCommunityModule]);


const GridComponent = () => {
    const [rowData, setRowData] = useState<any[]>([]);



    useEffect(() => {
        fetchKeyEvents()
            .then(data => setRowData(data))
            .catch(error => console.error('Failed to fetch rowData:', error));
    }, []);
    const gridOptions:object = {
        autoSizeStrategy: {
            type: 'fitGridWidth',
            defaultMinWidth: 100,

        },
        sortable: true
    }
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: "event_date",  sort: "desc", width: 150, headerName: "Event Date", filter: 'agDateColumnFilter', floatingFilter: true,},
        { field: "project_name", width: 150, headerName: "Project", filter: 'agTextColumnFilter', floatingFilter: true },
        { field: "event_details", width: 350, headerName: "Event Details", filter: 'agTextColumnFilter', floatingFilter: true },
        { field: "created_at", width: 150, headerName: "Last Updated", filter: 'agDateColumnFilter', floatingFilter: true,},
        { field: "created_at", width: 150, headerName: "Last Updated", filter: 'agDateColumnFilter', floatingFilter: true, }
    ]);

    return (
            <div className="w-full h-[50vh]">
                <AgGridReact gridOptions={gridOptions}
                             rowData={rowData}
                             columnDefs={columnDefs}/>
            </div>
        );
};

export default GridComponent;
