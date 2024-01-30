import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "youremail@email.com" },
                password: { label: "Password", type: "password", placeholder: "********"},
            },
            async authorize(credentials, req) {
                //console.log("credentials: ", credentials);

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!userFound) throw new Error("User not found");
                ///console.log("userFound: ", userFound);

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);

                if (!passwordMatch) throw new Error("User not found");
                
                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                }
            }
        })
    ],
    pages : {
        signIn: "/auth/login",
    },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST}