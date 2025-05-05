'use client';

import { useEffect, useState } from 'react';
import { fetchAllProjects } from '@/app/lib/data';

export default function ProductivityChart() {
  const [stats, setStats] = useState({
    total: 0,
    ready: 0,
    internal: 0,
    external: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const projects = await fetchAllProjects();

      const total = projects.length;
      const readyProjects = projects.filter(project => project.approved_status === 'Ready for review').length;
      const approvedInternal = projects.filter(project => project.approved_status === 'Approved for Internal Use').length;
      const approvedExternal = projects.filter(project => project.approved_status === 'Approved for External Use').length;

      setStats({
        total,
        ready: readyProjects,
        internal: approvedInternal,
        external: approvedExternal
      });
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Each card */}
      <div className="bg-[#1f4656] hover:bg-[#2b6173] rounded-lg shadow p-6 flex flex-col items-center justify-center aspect-square">
        <span className="text-lg text-white">Total Projects</span>
        <span className="text-2xl text-white font-bold">{stats.total}</span>
      </div>

      <div className="bg-[#1f4656] hover:bg-[#2b6173] rounded-lg shadow p-6 flex flex-col items-center justify-center aspect-square">
        <span className="text-lg text-white">Ready for Review</span>
        <span className="text-2xl text-white font-bold">{stats.ready}</span>
      </div>

      <div className="bg-[#1f4656] hover:bg-[#2b6173] rounded-lg shadow p-6 flex flex-col items-center justify-center aspect-square">
        <span className="text-lg text-white">Approved for Internal Use</span>
        <span className="text-2xl text-white font-bold">{stats.internal}</span>
      </div>

      <div className="bg-[#1f4656] hover:bg-[#2b6173] rounded-lg shadow p-6 flex flex-col items-center justify-center aspect-square">
        <span className="text-lg text-white">Approved for External Use</span>
        <span className="text-2xl text-white font-bold">{stats.external}</span>
      </div>
    </div>
  );
}
