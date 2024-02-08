import {NextAuthConfig} from "next-auth";
import {getUserByEmail} from "@/app/lib/data/users";

export const authConfig = {
    pages:{
        signIn:"/login",
    },
    callbacks: {
    async session({ session }) {
        // console.log("session", {session})
        const user = await getUserByEmail(session?.user?.email || "");
        // @ts-ignore
        session.user.id = user?.id;
        // @ts-ignore
        session.user.isAdmin = user?.is_admin;
        // @ts-ignore
        session.user.isActive = user?.is_active;

        return session;
    },
        authorized({auth,request:{nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnAlbum = nextUrl.pathname.startsWith('/album');
            if(isOnDashboard || isOnAlbum){
                if(isLoggedIn) return true
                return false; // redirect unauthenticated users to login page
            } else if (isLoggedIn){
                // @ts-ignore
                if(auth?.user?.isAdmin){
                return Response.redirect(new URL('/dashboard',nextUrl));
                }
                return Response.redirect(new URL('/album',nextUrl));
            }

            return true
        }
    },
    providers: []
} satisfies NextAuthConfig