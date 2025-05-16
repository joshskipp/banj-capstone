"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, QuickFilterModule, ClientSideRowModelModule } from "ag-grid-community";
import { fetchAllCommodities } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { PlusCircleIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../button';
import Link from "next/link";

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, QuickFilterModule]);

const CommoditiesGrid = () => {
    const [rowData, setRowData] = useState<any[]>([]);
    const gridRef = useRef<AgGridReact>(null);

    useEffect(() => {
        fetchAllCommodities()
            .then(data => setRowData(data))
            .catch(error => console.error('Failed to fetch commodities:', error));
    }, []);

    const gridOptions = {
        onRowClicked: (event: { data: { commodity_id: any } }) => {
            redirect(`/dashboard/commodities/${event.data.commodity_id}`);
        }
    };

    const [columnDefs] = useState<ColDef[]>([
        { field: "commodity_id", headerName: "ID", maxWidth: 100 },
        { field: "commodity_name", headerName: "Name", filter: "agTextColumnFilter", sortable: true },
        { field: "element", headerName: "Element", filter: "agTextColumnFilter", sortable: true },
        { field: "units_of_measure", headerName: "Units", maxWidth: 150 },
        { field: "notes", headerName: "Notes", flex: 1 },
        { field: "created_by", headerName: "Created By", maxWidth: 120 },
        { field: "created_at", headerName: "Created At", maxWidth: 160,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString()
        },
    ]);

    const exportToCsv = () => {
        if (gridRef.current?.api) {
            const dateTime = new Date().toISOString().replace(/[:.-]/g, '_');
            const fileName = `commodities_export_${dateTime}.csv`;
            gridRef.current.api.exportDataAsCsv({ fileName });
        }
    };

    return (
        <div style={{ width: "100%", height: "70vh" }}>
            <div className="mb-4 flex gap-4">
                <Link href="/dashboard/commodities/new">
                    <Button className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
                        <PlusCircleIcon className="w-5 h-5 text-white" />
                        Add Commodity
                    </Button>
                </Link>

                

                <Button onClick={exportToCsv} className="flex items-center gap-2 bg-[#1f4656] text-white hover:bg-[#2b6173]">
                    <ArrowDownTrayIcon className="w-5 h-5 text-white" />
                    Export Commodities
                </Button>
            </div>

            <div className="ag-theme-quartz" style={{ height: "100%", width: "100%" }}>
                <AgGridReact
                    ref={gridRef}
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

export default CommoditiesGrid;
