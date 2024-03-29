'use client';

import {User} from '@/app/lib/definitions';
import {EnvelopeIcon, PencilIcon,} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import {updateUser} from "@/app/lib/actions";
import {useFormState} from "react-dom";

type Props = {
    user: User
}
export default function EditUserForm({user}: Props) {
    const initialState = {message: null, errors: {}};
    const updateUserWithId = updateUser.bind(null, user.id)
    const [state, dispatch] = useFormState(updateUserWithId, initialState)
    console.log({state}, state.errors)
    return (
        <form action={dispatch}>
            <div className="flex gap-2">
                <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full">
                    {/* Customer Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            User name
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter customer name"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="customer-name-error"
                                    defaultValue={user.name}
                                    // required
                                />
                                <PencilIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                        <div id="customer-name-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.name &&
                                state.errors.name.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    {/* Customer Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            Customer email
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter customer email"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="customer-email-error"
                                    defaultValue={user.email}
                                    // required
                                />
                                <EnvelopeIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                        <div id="customer-email-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.email &&
                                state.errors.email.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                    </div>
                    <div id="form-error" aria-live="polite" aria-atomic="true">
                        {state.message &&
                            <p className="mt-2 text-sm text-red-500">
                                {state.message}
                            </p>
                        }
                    </div>
                    {/* Is admin */}
                    <div className="mb-4">
                        <label htmlFor="is_admin" className="mb-2 block text-sm font-medium">
                            Is Admin?
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="is_admin"
                                    name="is_admin"
                                    type="checkbox"
                                    className="peer rounded-md border border-gray-200 p-3 mr-3 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="user-is_admin-error"
                                    defaultChecked={user.is_admin}
                                />
                                This means they have admin rights if checked
                            </div>
                        </div>
                        <div id="user-is_admin-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.is_admin &&
                                state.errors.is_admin.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    {/* Is active */}
                    <div className="mb-4">
                        <label htmlFor="is_active" className="mb-2 block text-sm font-medium">
                            Is Active?
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="is_active"
                                    name="is_active"
                                    type="checkbox"
                                    className="peer rounded-md border border-gray-200 p-3 mr-3 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="user-is_active-error"
                                    defaultChecked={user.is_active}
                                />
                                This means they have an active account if checked
                            </div>
                        </div>
                        <div id="user-is_admin-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.is_active &&
                                state.errors.is_active.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                        <div id="form-error" aria-live="polite" aria-atomic="true">
                            {state.message &&
                                <p className="mt-2 text-sm text-red-500">
                                    {state.message}
                                </p>
                            }
                        </div>
                    </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/users"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit User</Button>
            </div>
        </form>
    );
}
