import React, {Suspense} from 'react';
import {Metadata} from "next";
import {lusitana} from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/invoices/pagination";
import {fetchCouponsPages} from "@/app/lib/data/coupons";
import Table from '@/app/ui/coupons/table';
import {CreateCoupon} from "@/app/ui/coupons/buttons";

export const metadata: Metadata = {
    title: 'Coupons',
};

type PageProps = {
    searchParams?: {
        query?: string;
        page?: string;
    }
}

export default async function Page({searchParams}: PageProps) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1
    const totalPages =  await  fetchCouponsPages(query);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
                    Coupons
                </h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search coupons..."/>
                <CreateCoupon/>
            </div>

            <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                <Table query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}
