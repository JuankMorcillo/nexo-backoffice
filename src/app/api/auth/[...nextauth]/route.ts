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
                        endpoint: 'auth/login',
                        method: 'POST' as const,
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    }
                    const res = await FetchApi(options)

                    const user = res.json()

                    console.log('adsadaddsa');

                    if (user) {
                        return user
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
                token.token = user.token
            }
            return token
        },
        session({ session, token, user }) {
            if (token && session.user) {
                session.user.identifier = user.identifier
                session.user.avatar_url = user.avatar_url
                session.user.id_type = user.id_type
                session.user.role = user.role
                session.user.subscriber_id = user.subscriber_id
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 8 * 60 * 60, // 8 hours
    }
})

export { handler as GET, handler as POST }