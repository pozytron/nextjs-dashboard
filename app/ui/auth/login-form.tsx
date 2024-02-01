'use client'
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import {useFormState, useFormStatus} from "react-dom";
import {authenticate} from "@/app/lib/actions";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)


  return (
      <>
        <div className="container">
          <div className="bg-creme-500 rounded-b-3xl max-w-[550px] mx-auto ">
            <img src="/img/backgrounds/login-top.jpg" alt="Zaloguj się do Smoksów"/>
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
                            placeholder="Podaj adres email"
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
                        Hasło
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
                  </div>
                  <LoginButton/>
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
            <img
                src="/img/backgrounds/login-bottom.jpg"
                alt="Zaloguj się do Smoksów"
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
          className="w-full mt-4 text-creme-100 text-16 bg-leo-500 border-2 rounded-full border-plazmus-800 px-10 py-5 inline-block hover:bg-peach-500 cursor-pointer"
              aria-disabled={pending}>
        Zaloguj się <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
      </Button>
  );
}
