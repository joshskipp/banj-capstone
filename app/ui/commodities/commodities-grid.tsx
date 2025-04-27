"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, QuickFilterModule, ClientSideRowModelModule } from "ag-grid-community";
import { fetchAllCommodities } from "@/app/lib/data";
import { redirect } from "next/navigation";

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
            gridRef.current.api.exportDataAsCsv();
        }
    };

    return (
        <div style={{ width: "100%", height: "70vh" }}>
            <button
                onClick={exportToCsv}
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
                Export to CSV
            </button>

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
