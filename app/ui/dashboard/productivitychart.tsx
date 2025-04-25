'use client';

import { useEffect, useState } from 'react';
import { fetchAllProjects } from '@/app/lib/data';

export default function ProductivityChart() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    internal: 0,
    external: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const projects = await fetchAllProjects();

      const total = projects.length;
      const newProjects = projects.filter(project => project.approved_status === 'new').length;
      const approvedInternal = projects.filter(project => project.approved_status === 'Approved for Internal Use').length;
      const approvedExternal = projects.filter(project => project.approved_status === 'Approved for External Use').length;

      setStats({
        total,
        new: newProjects,
        internal: approvedInternal,
        external: approvedExternal
      });
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Each card */}
      <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center justify-center aspect-square">
        <span className="text-lg text-gray-500">Total Projects</span>
        <span className="text-2xl font-bold">{stats.total}</span>
      </div>

      <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center justify-center aspect-square">
        <span className="text-lg text-gray-500">New Projects</span>
        <span className="text-2xl font-bold">{stats.new}</span>
      </div>

      <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center justify-center aspect-square">
        <span className="text-lg text-gray-500">Internal Approved</span>
        <span className="text-2xl font-bold">{stats.internal}</span>
      </div>

      <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center justify-center aspect-square">
        <span className="text-lg text-gray-500">External Approved</span>
        <span className="text-2xl font-bold">{stats.external}</span>
      </div>
    </div>
  );
}
