import React from 'react';
import {Metadata} from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";
import Form from "@/app/ui/coupons/generate-form";

export const metadata: Metadata = {
    title: 'Generuj kupony',
};


const breadcrumbs = [
    {label: 'Kupony', href: '/dashboard/coupons'},
    {label: 'Generuj kupony', href: '/dashboard/coupons/generate', active: true},
];

export default async function Page() {
    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Form />
        </main>
    );
}
