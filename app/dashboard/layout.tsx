//import SideNav from "@/app/ui/dashboard/sidenav-template";

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Link from 'next/link'


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen bg-[#f8f5f6]">
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full overflow-y-auto">
          <div className="bg-[#1f4656] text-white text-xs">
            <div className="container flex justify-between items-center mx-auto">
            <div></div>
            
            <div>
              <form action={
                async () => {
                  'use server';
                  await signOut({redirectTo: '/'});
                }
              }>
              <button className="flex  w-full grow items-center justify-center gap-2 bg-orange-600 p-3 hover:bg-orange-900 hover:text-white md:flex-none md:justify-start md:p-1 md:px-5">
              <PowerIcon className="w-4" />
              Logout
              </button>
              </form>
            </div>
            </div>

          </div>
        <header className="bg-[#fff] text-white py-6">
          <div className="container mx-auto px-4  justify-between items-start">
          <h1 className="text-3xl font-bold text-[#1f4656] border-l-2 border-l-[#7a232a] pl-3">Prospector</h1>

    </div>

  </header>
          <div className="container mx-auto px-4  justify-between items-start ">
            <div className="ml-0 flex items-start space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <Link href="/dashboard" className=" bg-gray-200 px-3 py-2 text-sm font-medium border-b-[#7a232a] border-b-4 hover:underline hover:underline-offset-4"  aria-current="page">Dashboard</Link>
                {/*<a href="#" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">link 1</a>*/}
                {/*<a href="#" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">link 2</a>*/}
                {/*<a href="#" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">link 3</a>*/}
                <Link href="/dashboard/settings" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">Settings</Link>
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