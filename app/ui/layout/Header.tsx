import Link from "next/link";
import {config} from "@/auth";
import {PowerIcon} from "@heroicons/react/24/outline";

export default function Header() {
    return (
        <div className="relative z-0">
            <header className="bg-leo-300 text-white lg:sticky top-0 z-50 border-b-4 border-leo-800">
                <div className="container px-5">
                    <div className="flex flex-wrap lg:flex-nowrap justify-center items-center lg:justify-between">
                        <div className="relative">
                            <Link href="/album" className="block w-[220px] relative my-5 lg:my-0 lg:top-6">
                                <img src="/img/logo/smoksy-logo.svg" alt="Smoksy"/>
                            </Link>
                        </div>
                        <nav className="child:p-5 child:inline-block text-14 font-600 uppercase">
                            <Link href="https://smoksy.pl/kontakt">O Smoksach</Link>
                            <Link href="/album" className="bg-peach-500 text-creme-100"
                            >Odbierz Smoksa</Link
                            >
                            <form
                                action={async () => {
                                    'use server';
                                    await config.signOut();
                                }}
                            >
                                     {/*className="flex w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"*/}
                                <button
                                >
                                    <div className="hidden md:block text-14 font-bold uppercase">Wyloguj</div>
                                </button>
                            </form>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    );
}