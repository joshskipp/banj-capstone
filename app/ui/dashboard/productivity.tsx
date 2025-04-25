// components/GridComponent.tsx
"use client";

import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useRef } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, QuickFilterModule, ClientSideRowModelModule, GridOptions } from "ag-grid-community";
import { fetchAllProjects } from "@/app/lib/data";
import { redirect } from "next/navigation";

// Register AG-Grid modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, QuickFilterModule]);

const Productivity = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const gridRef = useRef<any>(null); // Reference to the AG-Grid instance

  // Fetch row data
  useEffect(() => {
    fetchAllProjects()
      .then(data => setRowData(data.slice(0, 15)))
      .catch(error => console.error('Failed to fetch rowData:', error));
  }, []);

  const gridOptions: GridOptions = {
    onRowClicked: (event: { data: { project_id: any; }; }) => {
      redirect(`/dashboard/projects/${event.data.project_id}`);
    },
  };

  // Column definitions
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "project_name", width: 300, headerName: "Project Name", sortable: true },
    { field: "updated_at", width: 300, headerName: "Last Updated", sortable: true },
    { field: "approved_status", width: 150, headerName: "Approval", sortable: true },
  ]);

  // Create chart automatically when data is loaded
  useEffect(() => {
    if (gridRef.current && rowData.length > 0) {
      const gridApi = gridRef.current.api;
      if (gridApi) {
        const chartOptions = {
          chartType: 'bar', // Can be changed to 'line', 'pie', etc.
          cellRange: {
            startRow: 0,
            endRow: rowData.length - 1,
            columns: ['project_name', 'productivity_score'], // Columns to plot in the chart
          },
          chartContainer: document.getElementById('chartContainer')!, // The container to render the chart
        };
        gridApi.createRangeChart(chartOptions); // Create chart based on the grid's data
      }
    }
  }, [rowData]); // Re-run this effect when rowData changes

  return (
    <div>
      <div style={{ width: "100%", height: "50vh" }}>
        <AgGridReact
          ref={gridRef}
          gridOptions={gridOptions}
          rowData={rowData}
          columnDefs={columnDefs}
          enableCharts={true} // Enable AG-Grid charting feature
          domLayout="autoHeight"
        />
      </div>

      {/* Container for the chart */}
      <div id="chartContainer" style={{ height: 400, width: '100%' }} />
    </div>
  );
};

export default Productivity;