'use client'
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon, PencilIcon, UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import {useFormState, useFormStatus} from "react-dom";
import {authenticate, registerUser} from "@/app/lib/actions";

export default function RegisterForm() {
  const initialState = {message: null, errors: {}};
  const [state, dispatch] = useFormState(registerUser, initialState)


  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Register a new account
        </h1>
        <div className="w-full">
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
                <UserIcon
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
          <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
              />
              <AtSymbolIcon
                  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
          </div>
          <div className="mt-4">
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
              />
              <KeyIcon
                  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
          </div>
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
        </div>
        <RegisterButton/>
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
        >
          {state.message && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                <p className="text-sm text-red-500">{state.message}</p>
              </>
          )}
        </div>
      </div>
    </form>
  );
}

function RegisterButton() {
  const {pending} = useFormStatus()
  return (
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
      </Button>
  );
}
