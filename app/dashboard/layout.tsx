//import SideNav from "@/app/ui/dashboard/sidenav-template";

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Link from 'next/link';
import CurrentUser from "@/app/ui/settings/current-user";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await CurrentUser();
  return (
        <div>
            <div className="container flex flex-row mx-auto px-4 items-start border-b-[#7a232a] gap-2.5">
                <Link
                    href="/dashboard"
                    className="bg-gray-200 px-3 py-2 text-sm font-medium border-b-[#7a232a] border-b-4 hover:underline hover:underline-offset-4"
                    aria-current="page">
                    Dashboard
                </Link>
                <Link
                    href="/dashboard/projects/"
                    className="px-3 py-2 text-sm font-medium hover:bg-gray-200 hover:underline hover:underline-offset-4 hover:border-b-[#7a232a] hover:border-b-4">
                    Projects
                </Link>
                <Link
                    href="/dashboard/commodities"
                    className="px-3 py-2 text-sm font-medium hover:bg-gray-200 hover:underline hover:underline-offset-4 hover:border-b-[#7a232a] hover:border-b-4">
                    Commodities
                </Link>
                <Link
                    href="#"
                    className="px-3 py-2 text-sm font-medium hover:bg-gray-200 hover:underline hover:underline-offset-4 hover:border-b-[#7a232a] hover:border-b-4">
                    Companies(*)
                </Link>
                <Link
                    href="#"
                    className="px-3 py-2 text-sm font-medium hover:bg-gray-200 hover:underline hover:underline-offset-4 hover:border-b-[#7a232a] hover:border-b-4">
                    Key Events(*)
                </Link>

                <Link
                    href="/dashboard/settings"
                    className="px-3 py-2 ml-auto text-sm font-medium hover:bg-gray-200 hover:underline hover:underline-offset-4 hover:border-b-[#7a232a] hover:border-b-4">
                    Settings
                </Link>

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