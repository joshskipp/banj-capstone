'use client';
import { usePathname} from "next/navigation";
import Link from "next/link";
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    DocumentTextIcon,
    BuildingOfficeIcon,
    CogIcon,
    NewspaperIcon,
} from "@heroicons/react/24/outline"
import clsx from "clsx";

const links = [
    {
        name: "Home",
        href: "/dashboard",
        icon: HomeIcon,
    },
    {
        name: "Projects",
        href: "/dashboard/projects",
        icon: ClipboardDocumentListIcon,
    },
    {
        name: "Commodities",
        href: "/dashboard/commodities",
        icon: DocumentTextIcon
    },
    {
        name: "Companies",
        href: "/dashboard/companies",
        icon: BuildingOfficeIcon
    },
    {
        name: "Key Events",
        href: "/dashboard/keyevents",
        icon: NewspaperIcon
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: CogIcon
    }
]

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="container flex flex-row align-items-center">
            {links.map((link => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={clsx("flex w-fit grow items-center justify-center gap-2 font-medium py-2 text-sm hover:underline-offset-4 hover:border-b-[#7a232a] hover:border-b-4", {"bg-gray-200 border-b-[#7a232a] border-b-4" : pathname === link.href})}>
                        <LinkIcon className="w-6" />
                        <p>{link.name}</p>
                    </Link>
                )
            }))}
        </nav>
    )
}