import React from 'react';
import {Metadata} from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";
import Form from "@/app/ui/users/create-form";

export const metadata: Metadata = {
    title: 'Create user',
};


const breadcrumbs = [
    {label: 'Users', href: '/dashboard/users'},
    {label: 'Create User', href: '/dashboard/users/create', active: true},
];

export default async function Page() {
    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Form />
        </main>
    );
}
