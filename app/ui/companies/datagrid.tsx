// app/companies/client.tsx
'use client';

import React from 'react';
import {CellClickArgs, CellMouseEvent, DataGrid} from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import {redirect} from "next/navigation";

// Define your company type based on your database schema
interface Company {
    company_id: string;
    name: string;
    // Add other fields from your company data
    asx?: string;
    notes?: string;
    created_at?: Date;
    updated_at?: Date;
}

interface CompaniesDataGridProps {
    initialCompanies: Company[];
}

export default function CompaniesDataGrid({ initialCompanies }: CompaniesDataGridProps) {

    function onCellClick(args: CellClickArgs<any>, event: CellMouseEvent) {
            event.preventGridDefault();
            console.log(`Clicked on ${args.row.id}`);
            redirect(`/dashboard/companies/${args.row.company_id}`);

    }

    // Define columns for the data grid
    const columns = [
        //{ key: 'id', name: 'ID', width: 5},
        { key: 'name', name: 'Company Name' },
        { key: 'asx', name: 'ASX Code' },
        { key: 'notes', name: 'Notes' },
        { key: 'created_at', name: 'Created At' },
        { key: 'updated_at', name: 'Updated At' },
    ];

    return (
            <div className="h-fit w-full">
                <DataGrid
                    defaultColumnOptions={{
                        minWidth: 50,
                        resizable: true,
                        sortable: true}}
                    columns={columns}
                    rows={initialCompanies}
                    rowKeyGetter={(row) => row.company_id}
                    className="fill-grid h-fit rdg-light"
                    onCellClick={onCellClick}
                />
            </div>
    );
}