import { auth } from "@/auth"


/**
 * Returns the session of the active user.
 */
export async function activeSession() {
    const session = await auth()

    if (!session?.user) return null

    return session.user;
}