import GridComponent from "@/app/ui/archived/grid-component";
import {Metadata} from 'next';
import {activeSession} from "@/app/lib/utils/activeSession";
import {getPermissions} from "@/app/lib/utils/getPermissions";

export const metadata: Metadata = {
    title: 'Projects',
};


export default async function Page() {

    // Get the current user's session details
    const currentUser = await activeSession();

    // Check user permissions (fetch permissions using user ID or session info)
    const u_per = await getPermissions(currentUser?.id || '');

    // Verify if the user has `admin` permission
    if (!u_per?.admin) {
        // Return a 403 Forbidden response or a message
        return (
            <main className="text-center mt-10">
                <h1>403 - Forbidden</h1>
                <p>You do not have permission to view this page.</p>
            </main>
        );
    }


    return (
        <main>
            <div className="mb-4">
                <h2><strong>Archived Projects</strong></h2>
                <p>These projects have been archived and not displayed on the project directory page.</p>
                <p><br />Projects are a foundational data type that represent individual critical minerals initiatives.
                    Projects serve as the central node connecting other data types such as Commodities, Companies, and
                    Key Events</p>
            </div>

            <GridComponent/>
        </main>
    )
}