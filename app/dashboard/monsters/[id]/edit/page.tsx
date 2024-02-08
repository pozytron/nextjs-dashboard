import React from 'react';
import {Metadata} from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";
import Form from "@/app/ui/monsters/edit-form";
import {fetchMonsterById} from "@/app/lib/data/monsters";

export const metadata: Metadata = {
    title: 'Edit user',
};

export default async function Page({params}:{params:{id:string}}) {
    const id = params.id;
    const monster = await fetchMonsterById(id)
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Monsters', href: '/dashboard/monsters'},
                {label: 'Edit Monster', href: `/dashboard/monsters/${id}/edit`, active: true},
            ]} />
            <Form monster={monster}/>
        </main>
    );
}
