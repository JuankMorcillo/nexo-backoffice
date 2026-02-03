import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { FetchApi } from '@/src/lib/api/fetchApi'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize(credentials, req) {
                try {

                    const options = {
                        endpoint: 'auth/signin',
                        method: 'POST' as const,
                        body: credentials
                    }

                    const res = await FetchApi(options)

                    if (res) {
                        return res
                    }

                } catch (error) {
                    console.error("Authorize Error:", error);
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.token = user.access_token
                token.user = user.user
            }
            return token
        },
        session({ session, token }) {

            if (token && session.user) {
                session.user.access_token = token.token as string
                session.user.user = token.user as any
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 8 * 60 * 60, // 8 hours
    },
    pages: {
        signIn: 'login'
    }
})

export { handler as GET, handler as POST }