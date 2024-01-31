import React from 'react';
import {Metadata} from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs/breadcrumbs";

export const metadata: Metadata = {
    title: 'Edit coupon',
};

export default async function Page({params}:{params:{id:string}}) {
    const id = params.id;
    // const coupon = await fetchCouponById(id)
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Coupon', href: '/dashboard/coupons'},
                {label: 'Edit Coupon', href: `/dashboard/coupons/${id}/edit`, active: true},
            ]} />
            {id}
            {/*<Form coupon={coupon} />*/}
        </main>
    );
}
