import NextAuth, { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { SessionInterface, UserProfile } from "@/types/commonTypes";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign({
                ...token,
                iss: 'grafbase',
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            }, secret)
            console.log(encodedToken, "encodedToken")
            return encodedToken
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret) as JWT
            console.log(decodedToken, "decodedToken")
            return decodedToken
        }
    },
    theme: {
        colorScheme: 'light',
        logo: '/logo.png'
    },
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string

            try {
                const data = await getUser(email) as { user?: UserProfile }

                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user
                    }
                }

                return newSession
            } catch (error) {
                console.log('error getting user data', error);
                return session
            }

        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                // get the user if they exist // query
                const userExists = await getUser(user?.email as string) as { user?: UserProfile }
                // if they dint exist, create them // mutation

                if (!userExists.user) {
                    await createUser(
                        user.name as string,
                        user.email as string,
                        user.image as string)
                }
                // return true if successful
                return true
            } catch (error: any) {
                console.log(error)
                return false
            }
        }
    }
}

export const getCurrentUser = async () => {
    const session = await getServerSession(authOptions) as SessionInterface;
    return session
}