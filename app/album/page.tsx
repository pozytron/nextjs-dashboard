import React from 'react';
import {MonstersAlbum} from "@/app/ui/album/MonstersAlbum";
import {Metadata} from "next";
import RedeemSection from "@/app/ui/album/RedeemSection";
import {config} from "@/auth";

export const metadata: Metadata = {
    title: 'Album',
};

export default async function Page() {
    const session = await config.auth()

    if (!session?.user) {
        return <div>loading...</div>
    }

    return <>
        <RedeemSection userId={session?.user?.id||''}/>
        <MonstersAlbum userId={session?.user?.id||''}/>
    </>
}

