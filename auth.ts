import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from "@auth/core/providers/credentials";
import {z} from "zod";

import bcrypt from 'bcrypt';
import {getUser} from "@/app/lib/data/users";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials){
            const parsedCredentials = z
                .object({email:z.string().email(),password:z.string().min(6)})
                .safeParse(credentials);
            if(parsedCredentials.success){
                const {email,password} = parsedCredentials.data;
                const user = await getUser(email);
                if(!user) return null
                const passwordMatches = await bcrypt.compare(password,user?.password);
                console.log("passwordMatches, hello:", {user})
                if(passwordMatches) return user;
            }
            console.log("Invalid credentials")
            return null

        }

    })],
});