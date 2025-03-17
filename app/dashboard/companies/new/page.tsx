import Link from "next/link";
import {Button} from "@/app/ui/button";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import NewCompanyForm from "@/app/ui/companies/new-company-form";

export default function Page() {
    return (
        <main>
            <div className="flex w-full flex-row my-2 justify-between">
                <h2>New Company</h2>
                <Link href="/dashboard/companies">
                    <Button className="-[12rem]">
                        <ArrowLeftIcon className="w-8 pr-2"/>
                        Back to Companies
                    </Button>
                </Link>
            </div>
            <NewCompanyForm />
        </main>
    )
}