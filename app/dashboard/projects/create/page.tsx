import CreateProjectForm from "@/app/ui/projects/create-project";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { GetSession } from "@/app/lib/get-session";
import { activeSession } from "@/app/lib/utils/activeSession";

export default async function Page() {
    const session = await GetSession();
    const reviewerName = session?.name || '';

    return (
        <div>
            <h1>Create Project</h1>
            <CreateProjectForm reviewerName={reviewerName} session={session} />
            <Link href="/dashboard/projects">
                <Button>
                    Back to Projects
                </Button>
            </Link>
        </div>
    )
}