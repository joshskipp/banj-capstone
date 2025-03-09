'use client'; // Mark this as a Client Component

import { useEffect, useState, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, ExcelExportModule } from 'ag-grid-enterprise'; // Import ExcelExportModule
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, GridReadyEvent } from 'ag-grid-community'; // Import GridReadyEvent

// Define the type for your row data
interface Project {
  project_id: string;
  project_name: string;
  latitude: number;
  longitude: number;
}

export default function Page() {
  const [rowData, setRowData] = useState<Project[]>([]);
  const gridRef = useRef<AgGridReact<Project>>(null); // Reference to the AG Grid instance

  // Fetch data from the API route
  useEffect(() => {
    fetch('/query') // Fetch data from the /query endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Project[]) => {
        console.log('Fetched data:', data); // Log the fetched data
        setRowData(data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  // Define column definitions
  const columnDefs: ColDef<Project>[] = [
    { field: 'project_name', headerName: 'Project Name', sortable: true, filter: true },
    { field: 'project_id', headerName: 'Project ID', sortable: true, filter: true },
    { field: 'latitude', headerName: 'Latitude', sortable: true, filter: true },
    { field: 'longitude', headerName: 'Longitude', sortable: true, filter: true },
  ];

  // Handle Excel export
  const handleExport = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsExcel(); // Trigger Excel export
    }
  }, []);

  return (
    <div>
      <h2><strong>Dashboard</strong></h2>
      <h3><strong>Project List</strong></h3>

      {/* Add Project Form */}
      <form action="/query" method="POST" className="mb-4">
        <div className="grid gap-4">
          <div>
            <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              name="project_name"
              id="project_name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Project
            </button>
          </div>
        </div>
      </form>

      {/* Export Button */}
      <div className="mb-4">
        <button
          onClick={handleExport}
          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Export to Excel
        </button>
      </div>

      {/* AG Grid Component */}
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact<Project>
          ref={gridRef} // Assign the gridRef here
          rowData={rowData} // Row data for the grid
          columnDefs={columnDefs} // Column definitions
          pagination={true} // Enable pagination
          paginationPageSize={10} // Set page size
          modules={[ClientSideRowModelModule, ExcelExportModule]} // Register required modules
        />
      </div>
    </div>
  );
}