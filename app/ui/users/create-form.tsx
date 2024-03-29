'use client'
import Link from 'next/link';
import {EnvelopeIcon, KeyIcon, PencilIcon} from "@heroicons/react/24/outline";
import {Button} from '@/app/ui/button';
import {useFormState} from "react-dom";
import {createUser} from "@/app/lib/actions";

export default function UserCreateForm() {
    const initialState = {message: null, errors: {}};
    const [state, dispatch] = useFormState(createUser, initialState)
    console.log({state})

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* User Name */}
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
                                placeholder="Enter user name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="user-name-error"
                                // required
                            />
                            <PencilIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="user-name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* User Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        User email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter user email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="customer-email-error"
                                // required
                            />
                            <EnvelopeIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="user-email-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.email &&
                            state.errors.email.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="mb-2 block text-sm font-medium">
                        Password
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter user password"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="user-password-error"
                                required
                                minLength={6}
                                // required
                            />
                            <KeyIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="user-password-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.password &&
                            state.errors.password.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Password Again */}
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="passwordAgain"
                    >
                        Password again
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="passwordAgain"
                            type="password"
                            name="passwordAgain"
                            placeholder="Enter password again"
                            required
                            minLength={6}
                        />
                        <KeyIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                    <div id="user-name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.passwordAgain &&
                            state.errors.passwordAgain.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Is admin */}
                <div className="mb-4">
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
                                    defaultChecked={false}
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
                </div>
                {/* Is active */}
                <div className="mb-4">
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
                                    defaultChecked={true}
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
                    </div>
                </div>
                <div id="form-error" aria-live="polite" aria-atomic="true">
                    {state.message &&
                        <p className="mt-2 text-sm text-red-500">
                            {state.message}
                        </p>
                    }
                </div>


            </div>


            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/users"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create User</Button>
            </div>
        </form>
    );
}
