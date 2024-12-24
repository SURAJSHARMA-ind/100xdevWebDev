
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { pages } from "next/dist/build/templates/app-page";

console.log(process.env.NEXTAUTH_SECRET);
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Username",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "Enter Your Name" },
              password: { label: "Password", type: "password",placeholder: "Enter Your Password" }
            },
            async authorize(credentials, req) {
              
                return {
                    name: "srj",
                    id: "1",
                    email: "srj@gmail.com"
                }
            },
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
        //   pages:{
        //     signIn :"/auth/signin",
        //   },     
    ],
    secret: process.env.NEXTAUTH_SECRET
});

export const GET = handler;
export const POST = handler;