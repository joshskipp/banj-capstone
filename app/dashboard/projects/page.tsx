"use client"; 

import { useEffect, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule, ExcelExportModule } from "ag-grid-enterprise"; 
import { ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { useRouter } from "next/navigation";

ModuleRegistry.registerModules([ClientSideRowModelModule, ExcelExportModule]); 

interface Project {
  project_id: string;
  project_name: string;
  latitude: number;
  longitude: number;
}

export default function ProjectsPage() {
  const [rowData, setRowData] = useState<Project[]>([]);
  const gridRef = useRef<AgGridReact<Project>>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/query")
      .then((response) => response.json())
      .then((data: Project[]) => {
        console.log("Fetched projects:", data);
        setRowData(data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const columnDefs: ColDef<Project>[] = [
    { field: "project_id", headerName: "Project ID", sortable: true, filter: true },
    { field: "project_name", headerName: "Project Name", sortable: true, filter: true },
    { field: "latitude", headerName: "Latitude", sortable: true, filter: true },
    { field: "longitude", headerName: "Longitude", sortable: true, filter: true },
  ];

  const onRowClicked = useCallback((event: any) => {
    router.push(`/dashboard/projects/${event.data.project_id}`);
  }, [router]);

  // Export Data to Excel
  const exportToExcel = () => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsExcel(); 
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      {/*  Export Button */}
      <button
        onClick={exportToExcel}
        style={{ marginBottom: 10, padding: "8px 12px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Export to Excel
      </button>

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact<Project>
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          rowModelType="clientSide"
          // modules={[ClientSideRowModelModule, ExcelExportModule]} 
          onRowClicked={onRowClicked} 
        />
      </div>
    </div>
  );
}

