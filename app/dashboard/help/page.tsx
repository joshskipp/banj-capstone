'use client'

import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const toggleHelpMenu = () => setIsHelpOpen(!isHelpOpen);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f4656] text-white p-4 border-r border-[#7a232a]">
        <nav>
          <ul className="space-y-4">
            <li><a href="#" className="text-lg hover:text-[#7a232a]">Welcome to Propsector</a></li>
            <li><a href="#" className="text-lg hover:text-[#7a232a]">Creating/Editing Data</a></li>
            <li><a href="#" className="text-lg hover:text-[#7a232a]">Searching and Filtering</a></li>
            <li><a href="#" className="text-lg hover:text-[#7a232a]">Exporting</a></li>
            <li><a href="#" className="text-lg hover:text-[#7a232a]">Reviewing</a></li>
            <li>
              <button 
                onClick={toggleHelpMenu} 
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

        {/* Help Section */}
        {isHelpOpen && (
          <div className="w-80 bg-[#f8f8f8] p-6 border-l border-[#7a232a]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">How to Use This Web Application</h2>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Step 1: Login</h3>
              <p>To get started, sign in using your credentials. If you don’t have an account, you can register from the login page.</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Step 2: Dashboard</h3>
              <p>The dashboard provides an overview of your data. You can click on different sections for more details.</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Step 3: Navigation</h3>
              <p>Use the navbar to navigate between different sections of the application. Each link will bring you to a relevant page where you can manage your data.</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Step 4: Settings</h3>
              <p>In the Settings section, you can customize your profile, preferences, and application settings to suit your needs.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

