import React from 'react';
import Form from "@/app/ui/customers/create-form";
import {Metadata} from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";

export const metadata: Metadata = {
    title: 'Create customer',
};


const breadcrumbs = [
    {label: 'Customers', href: '/dashboard/customers'},
    {label: 'Create Customer', href: '/dashboard/customers/create', active: true},
];

export default async function Page() {
    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Form />
        </main>
    );
}
