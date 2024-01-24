


    import {NextAuthConfig} from "next-auth";

export const authConfig = {
    pages:{
        // This is not required, but by adding signIn: '/login' into our pages option,
        // the user will be redirected to our custom login page, rather than the NextAuth.js default page.
        signIn:"/login"
    },
    callbacks: {
        // This will prevent users from accessing the dashboard pages unless they are logged in.
        authorized({auth,request:{nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if(isOnDashboard){
                if(isLoggedIn) return true
                return false; // redirect unauthenticated users to login page
            } else if (isLoggedIn){
                return Response.redirect(new URL('/dashboard',nextUrl));
            }

            return true
        }
    },
    providers: []
} satisfies NextAuthConfig