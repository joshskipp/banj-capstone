
import NavBar from "@/app/ui/dashboard/nav-bar";


export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
        <div>
            <div className="container flex flex-row mx-auto px-4 items-start border-b-[#7a232a] gap-2.5">
                <NavBar />
            </div>
          <main className="container mx-auto px-4 py-4">
          {children}
          </main>
          </div>
  );}