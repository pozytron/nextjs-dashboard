import {Metadata} from "next";
import {fetchInvoiceById} from "@/app/lib/data/invoices";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";
import React from "react";
import {fetchCustomerById} from "@/app/lib/data/customers";
import Form from "@/app/ui/customers/edit-form";

export const metadata: Metadata = {
    title: 'Edit customer',
};

export default async function Page({params}:{params:{id:string}}){
    const id = params.id;
    const customer = await fetchCustomerById(id)
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Customers', href: '/dashboard/customers'},
                {label: 'Edit Customer', href: `/dashboard/customers/${id}/edit`, active: true},
            ]} />
            {JSON.stringify(customer)}
            <Form customer={customer}/>
        </main>
    )
}
