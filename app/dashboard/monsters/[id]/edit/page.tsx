import React from 'react';
import {Metadata} from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";
import {fetchUserById} from "@/app/lib/data/users";
import Form from "@/app/ui/users/edit-form";

export const metadata: Metadata = {
    title: 'Edit user',
};

export default async function Page({params}:{params:{id:string}}) {
    const id = params.id;
    const user = await fetchUserById(id)
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Users', href: '/dashboard/users'},
                {label: 'Edit User', href: `/dashboard/users/${id}/edit`, active: true},
            ]} />
            <Form user={user}/>
        </main>
    );
}
