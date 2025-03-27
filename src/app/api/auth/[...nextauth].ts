import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },

            async authorize(credentials) {
                const {email, password} = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = {
                    id: 1,
                    email: email,
                    password: password,
                };
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt({token, account, profile, user}: any){
            if (account?.provider === "credentials") {
                token.email = user.email
            }
            return token;
        },

        async session ({session, token}: any) {
            if("email" in token) {
                session.user.email = token.email;
            }
            session.user.email = token.email;
            return session;
        }
    }
}

export default NextAuth(authOptions);