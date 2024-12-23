
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";

console.log(process.env.NEXTAUTH_SECRET);
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "suraj" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              
                return {
                    name: "srj",
                    id: "1",
                    email: "srj@gmail.com"
                }
            },
          }),
          // pages:{
          //   signIn :"/auth/signin",
          // },
    ],
    secret: process.env.NEXTAUTH_SECRET
});

export const GET = handler;
export const POST = handler;