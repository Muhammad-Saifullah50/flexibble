import NextAuth from "next-auth";
import { authOptions } from "@/lib/session";

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}

// we are using the next-auth package for authentiction
// and importing the authoptions function which contains configurtion about the authentication

// then we export the handler variable two times, one as GET request and other as POST request 