import React from 'react';
import {Metadata} from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";
import Form from "@/app/ui/coupons/create-form";

export const metadata: Metadata = {
    title: 'Create coupon',
};


const breadcrumbs = [
    {label: 'Coupons', href: '/dashboard/coupons'},
    {label: 'Create Coupon', href: '/dashboard/users/coupon', active: true},
];

export default async function Page() {
    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Form />
        </main>
    );
}
