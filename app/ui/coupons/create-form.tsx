'use client'
import Link from 'next/link';
import {
    PencilIcon,
} from '@heroicons/react/24/outline';
import {Button} from '@/app/ui/button';
import {createCoupon} from "@/app/lib/actions";
import {useFormState} from "react-dom";

export default function Form() {
    const initialState = {message: null, errors: {}};
    const [state, dispatch] = useFormState(createCoupon, initialState)
    console.log({state}, state.errors)
    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/*Coupon Code*/}
                <div className="mb-4">
                    <label htmlFor="code" className="mb-2 block text-sm font-medium">
                        Coupon Code
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="code"
                                name="code"
                                type="text"
                                placeholder="Enter coupon code"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="coupon-code-error"
                                required
                            />
                            <PencilIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="coupon-code-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.code &&
                            state.errors.code.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/*Coupon Description*/}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Coupon Description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Enter coupon description"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="coupon-description-error"
                                required
                            />
                            <PencilIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="coupon-description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.description &&
                            state.errors.description.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/coupons"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Coupon</Button>
            </div>
        </form>
    );
}
