import UserModel from '@/models/user.model'
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connection from '@/ultils/db'

const options = NextAuth({
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "credentials",
            async authorize(credentials) {
                await connection();

                try {
                    const { email, password } = credentials;
                    const user = await UserModel.findOne({ email });
                    if (user) {
                        const isValid = await bcrypt.compare(password, user.password);
                        if (isValid) {
                            return user
                        } else {
                            throw new Error("Usuário ou senha inválidos");
                        }
                    } else {
                        throw new Error("Usuário ou senha inválidos");
                    }

                } catch (e) {
                    throw new Error(e.message);
                }
            }
        })
    ],
    pages: {
        signIn: "/register",
        signOut: "/login",
        error: "/login",
    },
})

export { options as GET, options as POST }
