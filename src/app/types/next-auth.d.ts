import NextAuth from "next-auth"

declare module "next-auth" {

    interface Session {
        user: User
    }
    
    interface User {
        access_token: string,
        user: {
            identifier: number,
            email: string,
            name: string,
            avatar: string | null,
        }
    }

}

declare module "next-auth/jwt" {
    interface JWT {
        token?: string,
        user: User
    }
}