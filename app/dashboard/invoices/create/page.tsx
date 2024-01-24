import React from 'react';
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";
import {Metadata} from "next";
import {fetchCustomers} from "@/app/lib/data/customers";

export const metadata: Metadata = {
    title: 'Create invoice',
};


const breadcrumbs = [
    {label: 'Invoices', href: '/dashboard/invoices'},
    {label: 'Create Invoice', href: '/dashboard/invoices/create', active: true},
];

export default async function Page() {
    const customers = await fetchCustomers();
    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Form customers={customers}/>
        </main>
    );
}
