import React, {Suspense} from 'react';
import {Metadata} from "next";
import {lusitana} from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/invoices/pagination";
import {fetchUserPages} from "@/app/lib/data/users";
import Table from '@/app/ui/users/table';
import {CreateUser} from "@/app/ui/users/buttons";

export const metadata: Metadata = {
    title: 'Users',
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
    const totalPages =  await  fetchUserPages(query);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
                    Users
                </h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search users..."/>
                <CreateUser/>
            </div>

            {/* TODO https://makingtechnology.atlassian.net/browse/SD-9*/}
            <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                <Table query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}
