"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, QuickFilterModule, ClientSideRowModelModule} from "ag-grid-community";
import { fetchAllEvents } from "@/app/lib/data";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { Button } from '../button';
import { ArrowDownTrayIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, QuickFilterModule]);

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

const GridComponent = () => {
    const [rowData, setRowData] = useState<any[]>([]);
    const gridRef = useRef<AgGridReact>(null); // Add a ref for the grid

    useEffect(() => {
        fetchAllEvents()
            .then(data => setRowData(data))
            .catch(error => console.error('Failed to fetch rowData:', error));
    }, []);

    const gridOptions = {
        onRowClicked: (event: { data: { event_id: any; }; }) => { redirect(`/dashboard/keyevents/${event.data.event_id}`); }
    };

    const [columnDefs] = useState<ColDef[]>([
        { field: "event_id", width: 300, headerName: "ID" },
        { field: "event_details", width: 300, headerName: "Event", filter: "agTextColumnFilter", sortable: true},
        { field: "event_date", width: 300, headerName: "Event Date", filter: "agTextColumnFilter",sortable: true },
        { field: "created_by", maxWidth: 120, headerName: "Created By", sortable: true },
        { field: "created_at", maxWidth: 120, headerName: "Created At", sortable: true },
    ]);

    // Function to export data to CSV
    const exportToCsv = () => {
        if (gridRef.current?.api) {
            gridRef.current.api.exportDataAsCsv();
        }
    };

    return (
        <div style={{ width: "100%", height: "70vh" }}>

            <div className="mb-4" style={{ display: 'flex', gap: '1rem', fontSize: '10px' }}>

            
            <Link href="/dashboard/keyevents/create">
                <Button className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
                    <PlusCircleIcon className="w-5 h-5 text-white" />
                    Add Event
                </Button>
            </Link>

            <Link href="/dashboard/keyevents/searchresults">
                <Button className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
                    <MagnifyingGlassIcon className="w-5 h-5 text-white" />
                    Search Events
                </Button>
            </Link>

            <Button onClick={exportToCsv} className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
                <ArrowDownTrayIcon className="w-5 h-5 text-white" />
                Export Events
            </Button>

                
            </div>

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