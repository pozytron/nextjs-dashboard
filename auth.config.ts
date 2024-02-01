import {NextAuthConfig} from "next-auth";
import {getUser} from "@/app/lib/data/users";

export const authConfig = {
    pages:{
        // This is not required, but by adding signIn: '/login' into our pages option,
        // the user will be redirected to our custom login page, rather than the NextAuth.js default page.
        signIn:"/login",
    },
    callbacks: {
    async session({ session }) {
        // console.log("session", {session})
        const user = await getUser(session?.user?.email || "");

        // @ts-ignore
        session.user.isAdmin = user?.is_admin;

        // @ts-ignore
        session.user.isActive = user?.is_active;

        return session;
    },
        // This will prevent users from accessing the dashboard pages unless they are logged in.
        // authorized({auth,request:{nextUrl}}){
        //     const isLoggedIn = !!auth?.user;
        //     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        //     if(isOnDashboard){
        //         if(isLoggedIn) return true
        //         return false; // redirect unauthenticated users to login page
        //     } else if (isLoggedIn){
        //         return Response.redirect(new URL('/dashboard',nextUrl));
        //     }
        //
        //     return true
        // }
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
        // TODO TRY MAKING THIS ON MY OWN BY ADDING SOME LOGIC TO REDIRECT USERS WHO ARE NOT ADMIN TO THE ALBUM PAGE

    },
    providers: []
} satisfies NextAuthConfig