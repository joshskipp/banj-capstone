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

            To launch the Prospector web application:

            You must use a specific Prospector account provided to you by the Georesources Intelligence unit.
            If you do not have an account, please contact the system administrator or a member of the Georesources Intelligence team.

            If you are a new user or unable to log in:
            Contact the Georesources Intelligence unit to request access or resolve any login issues.

            <h2>Home Dashboard</h2>
            Once logged in, you will be directed to the Home Dashboard. This page is the central hub of the Prospector web application. 
            It provides users with easy access to the most commonly used tools and actions, helping you navigate efficiently through the application.
            The page is divided into several key areas: 
            
            <h2>Navigation Bar</h2>
            Home (Returns you to the dashboard), Projects (View and manage all existing projects), Commodities (Access or add information about commodities), Companies (View or register company details), 
            Key Events (Browse or log significant project-related events), and Settings (Manage account and application settings).

            <h2>Shortcuts</h2>
            This section offers quick access buttons for creating new records: Create Project, Create Commodity, Create Company, Create Key Event.

            <h2>Tools/Help</h2>
            Help – Opens tips and supporting documentation (this manual) to assist with using the system.
            Search – Allows users to search through records in the database, such as projects, companies, or events, using keywords or filters.

            <h2>Productivity</h2>
            At the bottom of the dashboard, there are two modules to showcase current productivity and recent activity within Prospector:
            Summary – Provides overview of figures that convey the number of projects created as well as the distribution of current approval status.
            Last Updated – Shows recently updated projects with the respective approval status.
          </div>
        )}

        {activeSection === 'datalists' && (
          <div className="w-full p-6">
            <h2>Data in Prospector</h2>

            In Prospector, there are several types of key data that can be entered and compiled into the platform. Each data list serves a different purpose, but together they create a connected and dynamic system for managing information related to critical minerals projects.
            The data types include:
            Projects
            Companies
            Commodities
            Key Events

            Each of these data lists are structured to support detailed record-keeping, filtering, linking, and reporting across the Prospector platform.  
            In the following sections, we will walk through how to access, create, edit, and manage these different types of data.

            <h2>Workflow Disclaimer</h2>
            It is important to note that in order to link the relevant companies, commodities and key events to a project, they must first be created in the respective creation pages. For example, a company can not be linked to the relevant project if the company doesn’t exist in the database.
            While all data types can be edited and altered, it is important to ensure that all other data types have been created first before creating the project. A project in the application serves as the main point of reference that a company, commodity or key event will belong to. 
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="w-full p-6">
            <h2>Projects</h2>
            In Prospector, Projects are a foundational data type that represent an individual critical minerals initiative. 
            Each project holds structured information related to its identity, location, material output, and approval status. The Project Directory allows users to view, filter, and manage these entries efficiently.

            <h2>Accessing Projects</h2>
            Navigate to the Projects tab from the navigation bar to open the Project Directory. This page lists all current projects in a tabular format, with tools for searching, filtering, and exporting data.

            Projects serve as the central node connecting other data types such as Commodities, Companies, and Key Events, enabling cross-referencing and deeper analysis across the platform. 
            
            <h2>Adding Projects</h2>
            To create a new project:
            1. From the Projects page, click the Add button.
            2. You will be directed to the Create New Project form.
            3.Fill out the required fields.
            4. Click Create Project to save your entry.
            If you wish to leave this form, simply click ‘Back to Projects’ at the bottom of the form.
          </div>
        )}

        {activeSection === 'commodities' && (
          <div className="w-full p-6">
            <h2>Commodities</h2>
            In Prospector, Commodities represent the critical minerals and materials associated with projects and companies. 
            Each commodity record includes structured information such as its name, units of measure, and key attributes.

            <h2>Accessing Commodities</h2>
            Navigate to the Commodities tab from the navigation bar to open the Commodity Directory. This page lists all current commodities in a tabular format, with tools for filtering, and exporting data.

            <h2>Adding Commodities</h2>
            To create a new commodity:
            1. From the Commodities page, click the New Commodity button.
            2. You will be directed to the Create New Commodity form.
            3. Fill out the required fields.
            4. Click Create Commodity to save your entry.

            If you wish to leave this form, simply click ‘Back to Commodities at the bottom of the form.
          </div>
        )}

        {activeSection === 'companies' && (
          <div className="w-full p-6">
            <h2>Companies</h2>
            In Prospector, Companies are the organisations that own, operate, or invest in critical minerals projects. Company records include structured information such as name and stock code.

            <h2>Accessing Companies</h2>
            Navigate to the Companies tab from the navigation bar to open the Companies List. This page lists all current companies in a tabular format, with tools for filtering, and exporting data.

            <h2>Adding Companies</h2>
            To add a new company:
            1. Navigate to the Companies tab.
            2. Click the Add New button to open the Create New Company form.
            3. Fill in the required fields.
            4. Click Create Company to save.
          </div>
        )}

        {activeSection === 'keyevents' && (
          <div className="w-full p-6">
            <h2>Key Events</h2>
            In Prospector, Key Events represent important milestones, announcements, or changes related to projects and companies. Examples include news articles and reports.
            
            <h2>Accessing Key Events</h2>
            Navigate to the Key Events tab from the navigation bar to open the Key Events List. This page lists all current key events in a tabular format, with tools for filtering, and exporting data.

            <h2>Adding Key Events</h2>
            To add a new key event:
            1. Navigate to the Key Events tab.
            2. Click the Add New button to open the Create New Key Event form.
            3. Complete the required fields.
            4. Click Create Key Event to save.

            Important Note: The event will be linked directly to the relevant project. This is the only field in a key event that can’t be edited once selected in the form and created.
          </div>
        )}

        {activeSection === 'review' && (
          <div className="w-full p-6">
            <h2>Reviewing</h2>
            Reviewing data entries is one of the main processes undertaken in Prospector. Reviewers for Prospector are users with the ability to update data entry review statuses and essentially ‘sign-off’ on entries they designate as ‘Approved’ for usage. 
            Reviewers ensure that the data submitted for approval is accurate and consistent with any data formatting practices employed by the organisation. Users can be assigned the Reviewer role by Administrators and Product Managers during user registration. 
            Users that do not have the Reviewer role won’t have access to the ‘Review Project’ button in a project entry’s Details page.

            <h2>What is an Approval Status?</h2>
            Approval Statuses are key pieces of information associated with every Project Entry, selected from a set of categorical options. 
            Approval statuses represent the current state of an entry as it progresses through the approval process, and help mitigate the chances of unapproved/unreviewed data usage occurring.    

            Important Note: The review process and assignment of approval status only takes place within the project data object

            <h2>Reviewing</h2>
            Reviewing a project data entry is a multi-step process, initiated from a project entry’s Details page.

            The ‘Review Project’ button will open the dedicated review page where a Review Status can be selected from the six options available in the dropdown, and any notes or advice regarding the review can be documented in the ‘Review Notes’ text entry field below. 

            Reviewers should aim to set appropriate Review Statuses for the project entries they are reviewing - the explanation for each option can be found in the above section. 

            Once these fields have been filled, the ‘Submit Review’ button will store the review within the project entry metadata, and set the ‘Approval Status’ and ‘Reviewer Notes’ featured in the project entry’s Details page to match. 



          </div>
        )}

        {activeSection === 'download' && (
          <div className="w-full p-6">
            Click below to download the User Guide for more detailed information
            <div className="mb-4">
            <button
              onClick={() => {
                const element = document.createElement("a");
                element.href = "/userguide.pdf"; 
                element.download = "userguide.pdf"; 
                document.body.appendChild(element); 
                element.click();
                document.body.removeChild(element); 
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