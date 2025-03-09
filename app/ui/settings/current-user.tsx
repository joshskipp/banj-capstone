import { auth } from "@/auth"

export default async function CurrentUser() {
    const session = await auth()

    if (!session?.user) return null

    return session.user;
}