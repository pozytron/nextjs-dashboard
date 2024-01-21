'use client'

import React, {useEffect} from 'react';

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
}

function Error({error,reset}: Props) {
    useEffect(() => {
        console.error(error.message);
        // add sentry here to log error
    },[error])
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-2xl text-center">Something went wrong!</h2>
            <code className="m-4 text-red-700">
                {error && error.message}
            </code>
            <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text sm text-white transition-colors hover:bg-blue-400"
            onClick={
                ()=>reset()
            }>
            Try again
            </button>
        </main>
    );
}

export default Error;