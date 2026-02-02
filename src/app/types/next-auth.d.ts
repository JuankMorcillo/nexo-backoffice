import NextAuth from "next-auth"

declare module "next-auth" {

    interface Session {
        user: User
    }

    interface JWT {
        token: string,
    }

    interface User {
        token: string,
        identifier: number,
        id_type: string,
        name: string,
        email: string,
        role: 'admin' | 'user',
        avatar_url?: string
        subscriber_id: number
    }

}