//import SideNav from "@/app/ui/dashboard/sidenav-template";

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Link from 'next/link';
import CurrentUser from "@/app/ui/settings/current-user";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await CurrentUser();
  return (
        <div>
          <div className="container mx-auto px-4  justify-between items-start ">
            <div className="ml-0 flex items-start space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <Link href="/dashboard" className=" bg-gray-200 px-3 py-2 text-sm font-medium border-b-[#7a232a] border-b-4 hover:underline hover:underline-offset-4"  aria-current="page">Dashboard</Link>
                <Link href="/dashboard/commodities" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">Commodities</Link>
                <a href="#" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">link 2</a>
                <a href="#" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">link 3</a>
                <a href="#" className=" px-3 py-2 text-sm font-medium hover:underline hover:underline-offset-4">link 4</a>
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


          <footer className="bg-[#1f4656] text-white min-h-48 border-t-[#7a232a] border-t-8">
            <div className="container px-4 py-1">
            qld.gov.au
            </div>
          </footer>
          </div>
  );}