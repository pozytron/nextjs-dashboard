import React from 'react';
import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/auth/login-form";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Login',
};

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen bg-creme-100">
            <div className="relative mx-auto flex w-full max-w- flex-col space-y-2.5 p-y md:-mt-32">
                <LoginForm/>
            </div>
        </main>
    );
}
