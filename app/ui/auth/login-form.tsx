'use client'
import {
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {Button} from '../button';
import {useFormState, useFormStatus} from "react-dom";
import {authenticate} from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)


    return (
        <>
            <div className="container">
                <div className="bg-creme-500 rounded-b-3xl max-w-[550px] mx-auto ">
                    <Image
                        src="/img/backgrounds/login-top.jpg"
                        alt="Zaloguj się do Smoksów"
                        width={550}
                        height={300}
                    />
                    <form action={dispatch}
                          className="max-w-2xl mx-auto text-leo-800 pb-10"
                    >
                        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                            <h1
                                className="text-leo-500 smoksy text-36 lg:text-44 xl:text-52 text-center py-5 max-w-lg mx-auto leading-none"
                            >Zaloguj się do świata Smoksów
                            </h1>
                            <div className="w-full">
                                <div>
                                    <label
                                        className="text-20"
                                        htmlFor="email"
                                    >
                                        Twój e-mail
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="text-24 w-full p-5 rounded-md my-5"
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Podaj adres email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="text-20"
                                        htmlFor="password"
                                    >
                                        Twoje hasło
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="text-24 w-full p-5 rounded-md my-5"
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <LoginButton/>
                                <Link
                                    href="/register"
                                    className="w-full inline-flex items-center justify-center hover:text-peach-500 hover:underline font-semibold"
                                >
                                    Załóż konto
                                </Link>
                            </div>
                            <div
                                className="flex h-8 items-end space-x-1"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {errorMessage && (
                                    <>
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                                        <p className="text-sm text-red-500">{errorMessage}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                    <Image
                        src="/img/backgrounds/login-bottom.jpg"
                        alt="Zaloguj się do Smoksów"
                        width={550}
                        height={300}
                    />
                </div>
            </div>
        </>
    );
}

function LoginButton() {
    const {pending} = useFormStatus()
    return (
        <Button
            type="submit"
            className="w-full text-creme-100 text-16 bg-leo-500 border-2 rounded-2xl border-plazmus-800 px-10 py-5 inline-flex items-center justify-center hover:bg-peach-500 cursor-pointer  font-semibold"
            aria-disabled={pending}>
            Zaloguj się
        </Button>
    );
}
