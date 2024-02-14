import React from "react";

export function CardCount(props: { count: any }) {
    return <div
        className="z-10 text-20 w-10 h-10 flex items-center justify-center absolute rounded-full p-3 right-1 top-1 bg-leo-500 text-white border-4 border-white "
    > x{props.count}</div>;
}
