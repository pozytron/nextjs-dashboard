import React from 'react';
import Header from "@/app/ui/layout/Header";
import {SessionProvider} from "next-auth/react";


function Layout({children}: { children: React.ReactNode }) {
    return (<>
            <Header/>
            {children}
        </>
    );
}

export default Layout;