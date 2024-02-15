import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <main className="h-screen w-full relative overflow-hidden">
            <Image
                src="/img/backgrounds/404_tlo.webp"
                alt="404 Strony nie znaleziono"
                layout="fill"
                objectFit="cover"
                quality={100}
                priority // Ensures the image loads first
            />

            <div className="z-10 absolute inset-0 flex flex-col items-center mt-60">
                <h2 className="text-48 font-bold text-peach-500 outline-2 ">Ups... Coś poszło nie tak!</h2>
                <p className="mt-6 text-xl font-semibold text-white">Strona, której szukasz nie istnieje.</p>
                <Link
                    href="https://smoksy.pl"
                className="m-4 w-full inline-flex items-center justify-center text-white hover:text-peach-500 underline font-semibold"
                >
                    Wróć do strony głównej
                </Link>

            </div>
        </main>
    );
}
