'use client';

import {Customer} from '@/app/lib/definitions';
import {ArrowUturnUpIcon, EnvelopeIcon, PencilIcon, UserCircleIcon,} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import {updateCustomer, updateMonster} from "@/app/lib/actions";
import {useFormState} from "react-dom";
import {Monster} from "@/app/ui/cards/CardsRedeem";
import {teams} from "@/app/ui/monsters/create-form";

type Props = {
    monster: any;
}
export default function EditMonsterForm({monster}: Props) {
    const initialState = {message: null, errors: {}};
    const updateMonsterWithId = updateMonster.bind(null, monster.id)
    const [state, dispatch] = useFormState(updateMonsterWithId, initialState)
    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Monster Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Monster name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter monster name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="monster-name-error"
                                defaultValue={monster.name}
                                // required
                            />
                            <PencilIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="monster-name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Power */}
                <div className="mb-4">
                    <label htmlFor="power" className="mb-2 block text-sm font-medium">
                        Power
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="power"
                                name="power"
                                type="number"
                                placeholder="Enter monster power"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="monster-power-error"
                                defaultValue={monster.power}
                                // required
                            />
                            <ArrowUturnUpIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="monster-power-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.power &&
                            state.errors.power.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Image */}
                <div className="mb-4">
                    <label htmlFor="image" className="mb-2 block text-sm font-medium">
                        Image
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="image"
                                name="image"
                                type="text"
                                placeholder="Enter monster image url"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="monster-image-error"
                                defaultValue={monster.image}
                                // required
                            />
                            <EnvelopeIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="monster-image-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.image &&
                            state.errors.image.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Planet */}
                <div className="mb-4">
                    <label htmlFor="planet" className="mb-2 block text-sm font-medium">
                        Planet
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="planet"
                                name="planet"
                                type="text"
                                placeholder="Enter monster planet url"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="monster-planet-error"
                                defaultValue={monster.planet}
                                // required
                            />
                            <EnvelopeIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="monster-planet-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.image &&
                            state.errors.image.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Team */}
                <div className="mb-4">
                    <label htmlFor="team" className="mb-2 block text-sm font-medium">
                        Team
                    </label>
                    <div className="relative">
                        <select
                            id="team"
                            name="team"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="monster-team-error"
                            defaultValue={monster.team}
                            // required
                        >
                            <option value="" disabled>
                                Select a team
                            </option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.name}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    <div id="monster-team-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.team &&
                            state.errors.team.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
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
                                    defaultChecked={monster.is_active}
                                />
                                This means that this monster is active if checked
                            </div>
                        </div>
                        <div id="user-is_active-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.is_active &&
                                state.errors.is_active.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                {/*FORM ERRORS */}
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
                    href="/dashboard/monsters"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Zapisz </Button>
            </div>
        </form>
    );
}
