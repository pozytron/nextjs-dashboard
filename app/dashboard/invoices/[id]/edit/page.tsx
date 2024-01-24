import React from 'react';
import Form from "@/app/ui/invoices/edit-form";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {fetchInvoiceById} from "@/app/lib/data/invoices";
import {fetchCustomers} from "@/app/lib/data/customers";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";

export const metadata: Metadata = {
    title: 'Edit invoice',
};

export default async function Page({params}:{params:{id:string}}){
    const id = params.id;
    const [invoice,customers] = await Promise.all([fetchInvoiceById(id),fetchCustomers()]);
    if(!invoice) notFound();
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Invoices', href: '/dashboard/invoices'},
                {label: 'Edit Invoice', href: `/dashboard/invoices/${id}/edit`, active: true},
            ]} />
        <Form invoice={invoice} customers={customers} />
        </main>
    )
}
