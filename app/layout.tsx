import '@/app/ui/global.css';
import { lato } from '@/app/ui/fonts';
import {VersionBadge} from "@/app/ui/version-badge";
import { GetSession } from "@/app/lib/get-session"
import {signOut} from "@/auth";
import {PowerIcon, KeyIcon} from "@heroicons/react/24/outline";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentSession = await GetSession(); // Returns null if not logged in, otherwise gets Session.

  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
      <div className="flex h-screen bg-[#f8f5f6]">
        <div className="flex flex-col flex-1 w-full">
          <div className="h-full overflow-y-auto">
      <div className="bg-[#1f4656] text-white text-xs">
        <div className="container flex justify-between items-center mx-auto">
          App/Layout

        <div className="flex">
          {currentSession == null &&
              <div className="flex flex-row items-center gap-2">
                <button className="flex  w-full grow items-center justify-center gap-2 bg-orange-600 p-3 hover:bg-orange-900 hover:text-white md:flex-none md:justify-start md:p-1 md:px-5">
                  <KeyIcon className="w-4" />
                  Login to access Dashboard.
                </button>
              </div>}
          {currentSession != null && (
              <div className="flex flex-row items-center gap-2"><p>Hello {currentSession.name}</p>
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
            )
          }
        </div>

        </div>
      </div>
            <header className="bg-[#fff] text-white py-6">
              <div className="flex flex-row container mx-auto px-4  items-center gap-6">
                <h1 className="text-3xl font-bold text-[#1f4656] border-l-2 border-l-[#7a232a] pl-3">
                  Prospector
                </h1>
                <VersionBadge />

              </div>

            </header>
            {children}
          </div>

        </div>

      </div>
      </body>
    </html>
  );
}
