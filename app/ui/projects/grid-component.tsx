"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, QuickFilterModule, ClientSideRowModelModule} from "ag-grid-community";
import { fetchAllProjectsData } from "@/app/lib/data";
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
        fetchAllProjectsData()
            .then(data => setRowData(data))
            .catch(error => console.error('Failed to fetch rowData:', error));
    }, []);

    const gridOptions = {
        onRowClicked: (event: { data: { project_id: any; }; }) => { redirect(`/dashboard/projects/${event.data.project_id}`); }
    };

    const [columnDefs] = useState<ColDef[]>([
        { field: "project_name", width: 300, headerName: "Project Name", filter: "agTextColumnFilter", sortable: true},
        { field: "company", maxWidth: 150, headerName: "Company", filter: "agTextColumnFilter", sortable: true },
        { field: "primary_commodities", maxWidth: 150, headerName: "Primary Commodities", filter: "agTextColumnFilter", sortable: true },
        { field: "secondary_commodities", maxWidth: 150, headerName: "Secondary Commodities", filter: "agTextColumnFilter", sortable: true },
        { field: "product", width: 300, headerName: "Product", filter: "agTextColumnFilter",sortable: true },
        { field: "project_status", maxWidth: 150, headerName: "Status", filter: "agTextColumnFilter", sortable: true },
        { field: "approved_status", maxWidth: 150, headerName: "Approval",filter: "agTextColumnFilter", sortable: true },
        { field: "approved_at", maxWidth: 150, headerName: "Last Approved", filter: "agDateColumnFilter", sortable: true },
        { field: "updated_by", maxWidth: 150, headerName: "Last Updated By", filter: "agTextColumnFilter", sortable: true },
        { field: "updated_at", maxWidth: 150, headerName: "Last Updated", filter: "agTextColumnFilter",sortable: true },
        { field: "created_by", maxWidth: 150, headerName: "Created By", filter: "agTextColumnFilter", sortable: true },
        { field: "created_at", maxWidth: 150, headerName: "Created At", filter: "agTextColumnFilter", sortable: true },
        // { field: "project_id", width: 300, headerName: "ID" },
        { field: "latitude", maxWidth: 120, sortable: true },
        { field: "longitude", maxWidth: 120, sortable: true },
    ]);

    // Function to export data to CSV
    const exportToCsv = () => {
        if (gridRef.current?.api) {
            const dateTime = new Date().toISOString().replace(/[:.-]/g, '_');
            const fileName = `projects_export_${dateTime}.csv`;
            gridRef.current.api.exportDataAsCsv({ fileName });
        }
    };

    const myTheme = themeQuartz.withParams({
        spacing: 4,
    });

    return (
        <div style={{ width: "100%", height: "70vh" }}>

            <div className="mb-4" style={{ display: 'flex', gap: '1rem', fontSize: '10px' }}>

            
            <Link href="/dashboard/projects/create">
                <Button className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
                    <PlusCircleIcon className="w-5 h-5 text-white" />
                    Add Project
                </Button>
            </Link>

            <Link href="/dashboard/projects/searchresults">
                <Button className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
                    <MagnifyingGlassIcon className="w-5 h-5 text-white" />
                    Search Projects
                </Button>
            </Link>

            <Button onClick={exportToCsv} className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
                <ArrowDownTrayIcon className="w-5 h-5 text-white" />
                Export Projects
            </Button>

            </div>

            {/* AG Grid */}
            <div className="ag-theme-quartz" style={{ height: '100%', width: "100%" }}>
                <AgGridReact
                    ref={gridRef} // Add the ref to the grid
                    theme={myTheme}
                    gridOptions={gridOptions}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={20}
                    rowModelType="clientSide"
                />
            </div>
        </div>
    );
};

export default GridComponent;