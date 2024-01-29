import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/libs/db";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "youremail@email.com" },
                password: { label: "Password", type: "password", placeholder: "********"},
            },
            async authorize(credentials, req) {
                console.log("credentials: ", credentials);

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!userFound) return null;
                console.log("userFound: ", userFound);

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);

                if (!passwordMatch) return null;
                
                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                }
            }
        })
    ]
};
const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST}