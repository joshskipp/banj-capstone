'use client'

import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>('welcome'); // Tracks the active section

  // Function to handle the section change
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f4656] text-white p-4 border-r border-[#7a232a]">
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => handleSectionChange('welcome')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Welcome to Prospector
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('creatingEditingData')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Creating/Editing Data
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('searchingFiltering')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Searching and Filtering
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('exporting')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Exporting
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('reviewing')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Reviewing
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('help')}
                className="text-lg hover:text-[#7a232a] mt-4 w-full text-left"
              >
                Help
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#f8f8f8] overflow-auto">
          {children}
        </main>

        {/* Content Sections */}
        {activeSection === 'welcome' && (
          <div className="w-full p-6">
            <h2>Welcome to Prospector</h2>
            
          </div>
        )}

        {activeSection === 'creatingEditingData' && (
          <div className="w-full p-6">
            <h2>Creating/Editing Data</h2>
            
          </div>
        )}

        {activeSection === 'searchingFiltering' && (
          <div className="w-full p-6">
            <h2>Searching and Filtering</h2>
            
          </div>
        )}

        {activeSection === 'exporting' && (
          <div className="w-full p-6">
            <h2>Exporting</h2>
            
          </div>
        )}

        {activeSection === 'reviewing' && (
          <div className="w-full p-6">
            <h2>Reviewing</h2>
            
          </div>
        )}

        {activeSection === 'help' && (
          <div className="w-full p-6">
            <div className="mt-4">
              <h3 className="text-lg font-semibold">FAQs</h3>
              <ul className="list-disc pl-5">
                <li>How do I change my password? Go to Settings &gt; Profile.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
