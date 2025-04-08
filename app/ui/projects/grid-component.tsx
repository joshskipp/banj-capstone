"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, QuickFilterModule, ClientSideRowModelModule} from "ag-grid-community";
import { fetchAllProjects } from "@/app/lib/data";
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
        fetchAllProjects()
            .then(data => setRowData(data))
            .catch(error => console.error('Failed to fetch rowData:', error));
    }, []);

    const gridOptions = {
        onRowClicked: (event: { data: { project_id: any; }; }) => { redirect(`/dashboard/projects/${event.data.project_id}`); }
    };

    const [columnDefs] = useState<ColDef[]>([
        { field: "project_id", width: 300, headerName: "ID" },
        { field: "project_name", width: 300, headerName: "Project Name", filter: "agTextColumnFilter", sortable: true},
        { field: "product", width: 300, headerName: "Product", filter: "agTextColumnFilter",sortable: true },
        { field: "latitude", maxWidth: 120, sortable: true },
        { field: "longitude", maxWidth: 120, sortable: true },
        { field: "updated_at", maxWidth: 150, headerName: "Last Updated", filter: "agTextColumnFilter",sortable: true },
        { field: "primary_commodity", maxWidth: 150, headerName: "Commodity", sortable: true },
        { field: "approved_status", maxWidth: 150, headerName: "Approval", sortable: true }
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

            
                <Link href="/dashboard/projects/create">
                <PlusCircleIcon title="Add Project" className="w-7 h-7"/>
                </Link>  

                <Link href="/dashboard/projects/searchresults">
                <MagnifyingGlassIcon title="Search Projects" className="w-7 h-7"/>
                </Link>             

                <ArrowDownTrayIcon title="Export Projects" onClick={exportToCsv} className="w-7 h-7"/>
                
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