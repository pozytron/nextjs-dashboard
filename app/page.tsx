import Link from 'next/link';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center p-6 bg-creme-100">
            <div>

                <Link href="/album" className="block w-[220px] relative my-5 lg:my-0 lg:top-6">
                    <img src="/img/logo/smoksy-logo.svg" alt="Smoksy"/>
                </Link>
            </div>
            <div className="flex gap-5 mt-10">
                <Link className="px-5 py-1 text-peach-500" href="https://smoksy.pl">O Smoksach</Link>
                <Link href="/login" className="px-5 py-1 bg-peach-500 rounded-full text-creme-100 hover:bg-leo-300">Zaloguj</Link>
                <Link href="/register" className="px-5 py-1 bg-peach-500 rounded-full text-creme-100 hover:bg-leo-300">Zarejestruj</Link>
            </div>

        </main>
    );
}
