'use client'

import { useState } from 'react';

export default function Page() {
  const [activeSection, setActiveSection] = useState<string>('welcome'); // Tracks the active section

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="flex min-h-screen">
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
                onClick={() => handleSectionChange('datalists')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Data Lists
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('projects')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('commodities')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Commodities
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('companies')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Companies
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('keyevents')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Key Events
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('review')}
                className="text-lg hover:text-[#7a232a] w-full text-left"
              >
                Reviewing Data
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('download')}
                className="text-lg hover:text-[#7a232a] mt-4 w-full text-left"
              >
                Download
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      
      <div className="flex-1 overflow-hidden flex">
        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#f8f8f8] overflow-auto">
          {/*{children}*/}
        </main>

        {/* Content Sections */}
        {activeSection === 'welcome' && (
          <div className="w-full p-6">
            <h2>Welcome to Prospector</h2>

            Welcome to Prospector, the web application designed to streamline the collection, validation, and analysis of critical mineral project data across Queensland.
            The application will transform unstructured data into a structured format and integrate vital information into the Azure Synapse data warehouse. 
            It will also enhance the department's ability to track significant events and support the Department’s goal of attracting investment to the state’s critical minerals sector. 
            This will support the global transition to green energy technologies.
            In the following sections, we will outline the key functionalities required for a standard user as well as the different roles that will be encompassed in the application. 
          </div>
        )}

        {activeSection === 'datalists' && (
          <div className="w-full p-6">
            <h2>Data in Prospector</h2>

          </div>
        )}

        {activeSection === 'projects' && (
          <div className="w-full p-6">
            <h2>Projects</h2>

          </div>
        )}

        {activeSection === 'commodities' && (
          <div className="w-full p-6">
            <h2>Commodities</h2>

          </div>
        )}

        {activeSection === 'companies' && (
          <div className="w-full p-6">
            <h2>Companies</h2>

          </div>
        )}

        {activeSection === 'keyevents' && (
          <div className="w-full p-6">
            <h2>Key Events</h2>

          </div>
        )}

        {activeSection === 'review' && (
          <div className="w-full p-6">
            <h2>Reviewing</h2>

          </div>
        )}

        {activeSection === 'download' && (
          <div className="w-full p-6">
            Click below to download the User Guide for more detailed information
            <div className="mb-4">
            <button
              onClick={() => {
                const element = document.createElement("a");
                const file = new Blob(["Download User Guide"], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = "example.txt";
                document.body.appendChild(element); // Required for Firefox
                element.click();
              }}
              className="bg-[#1f4656] hover:bg-[#163340] text-white py-2 px-4 rounded"
            >
              Download File
            </button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}