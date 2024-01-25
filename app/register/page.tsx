import React from 'react';
import AcmeLogo from "@/app/ui/acme-logo";
import {Metadata} from "next";
import RegisterForm from "@/app/ui/auth/register-form";

export const metadata: Metadata = {
    title: 'Register',
};

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w- flex-col space-y-2.5 p-y md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo/>
                    </div>
                </div>
                <RegisterForm/>
            </div>
        </main>
    );
}
