'use client';

import { fetchAllProjects } from "@/app/lib/data";
import GridComponent from "@/app/ui/projects/grid-component";
import { Button } from "@/app/ui/button";
import Databox from "@/app/ui/devtools/databox";
import { Metadata } from 'next';
import Link from 'next/link';
import React, { useRef } from 'react';
import { PlusCircleIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Projects',
};

export default async function Page() {
    const AllProjects = await fetchAllProjects();
    const gridRef = useRef<any>(null); // Ref for accessing export function

    const handleExport = () => {
        if (gridRef.current?.exportToCsv) {
            gridRef.current.exportToCsv();
        }
    };

    return (
        <main>
            <div className="my-3 flex w-full flex-row justify-end">
                <Link href="/dashboard/projects/searchresults">
                    <Button className="w-[12rem] flex gap-2">
                        Search Projects
                    </Button>
                </Link>
            </div>

            <div style={{ display: 'flex', gap: '1rem', fontSize: '10px' }}>
                <PlusCircleIcon title="Add Project" className="w-5 h-5 cursor-pointer" />

                <Link href="/dashboard/projects/searchresults">
                    <MagnifyingGlassIcon title="Search Projects" className="w-5 h-5 cursor-pointer" />
                </Link>

                <button onClick={handleExport}>
                    <ArrowDownTrayIcon title="Export Projects" className="w-5 h-5 cursor-pointer" />
                </button>
            </div>

            <GridComponent ref={gridRef} />
            <Databox rawData={AllProjects} />
        </main>
    );
}
