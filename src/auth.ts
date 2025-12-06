import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                console.log("Authorize called with:", credentials);
                const parsedCredentials = z
                    .object({ email: z.string(), password: z.string().min(4) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    console.log("Parsed credentials:", { email, password });
                    // Updated credentials as requested
                    if (email === "inwa" && password === "inwa@24") {
                        console.log("Credentials match! Returning user.");
                        return { id: "1", name: "Admin", email: email }
                    }
                    console.log("Credentials mismatch.");
                } else {
                    console.log("Zod parsing failed:", parsedCredentials.error);
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith("/admin")
            if (isOnAdmin) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            }
            return true
        },
    },
})
