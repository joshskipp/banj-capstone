//import SideNav from "@/app/ui/dashboard/sidenav-template";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f8f5f6]">
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full overflow-y-auto">
          <div className="bg-[#1f4656] text-white text-xs">
            <div className="container mx-auto px-4">
            qld.gov.au
            </div>
          </div>
        <header className="bg-[#fff] text-white py-6">
          <div className="container mx-auto px-4  justify-between items-start">
          <h1 className="text-3xl font-bold text-[#1f4656] border-l-2 border-l-[#7a232a] pl-3">Prospector</h1>

    </div>

  </header>
          <div className="container mx-auto px-4  justify-between items-start ">
          <div className="ml-0 flex items-baseline space-x-4">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <a href="/dashboard" className=" bg-gray-200 px-3 py-2 text-sm font-medium border-b-[#7a232a] border-b-4 hover:underline hover:underline-offset-4"  aria-current="page">Dashboard</a>
              <a href="#" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">link 1</a>
              <a href="/dashboard/projects" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">Projects</a>
              <a href="#" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">link 3</a>
              <a href="#" className=" px-3 py-2 text-sm font-medium  hover:underline hover:underline-offset-4">link 4</a>
            </div>
            </div>
          <main className="container mx-auto px-4 py-4">
          {children}
          </main>
          
          </main>

 
          <footer className="bg-[#1f4656] text-white min-h-48 border-t-[#7a232a] border-t-8">
            <div className="container mx-auto px-4 py-1">
            qld.gov.au
            </div>
          </footer>
          </div>
          
          </div>
  );}