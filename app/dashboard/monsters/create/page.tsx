import React from 'react';
import {Metadata} from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";
import Form from "@/app/ui/monsters/create-form";

export const metadata: Metadata = {
    title: 'Create monster',
};


const breadcrumbs = [
    {label: 'Monsters', href: '/dashboard/monsters'},
    {label: 'Create Monsters', href: '/dashboard/monsters/create', active: true},
];

export default async function Page() {
    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Form />
        </main>
    );
}
