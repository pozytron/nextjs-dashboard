'use client'
import React, { useEffect, useState} from 'react';
import {MonsterCard} from "@/app/ui/cards/MonsterCard";
import InputMask from 'react-input-mask';
import {monsters} from '@/app/lib/placeholder-data';
import {CardRedeem, Monster} from "@/app/ui/cards/CardsRedeem";
import {useFormState} from "react-dom";
import {redeemCoupon} from "@/app/lib/actions";
import {useRouter} from "next/navigation";



export default function RedeemSection({userId}:{userId:string}) {
    const router = useRouter();
    const [randomCharacter, setRandomCharacter] = useState<any>(monsters[0]);
    const [startRedeem, setStartRedeem] = useState(false);
    const initialState = {
        is_success: false,
        monster:null,
        message: null,
        errors: {}
    };
    const [state, dispatch] = useFormState(redeemCoupon, initialState)

    useEffect(() => {
        if(state.is_success===true) {
            setRandomCharacter(state.monster)
            setStartRedeem(true);
        }
    }, [state]);


    return (
        <div>
            {startRedeem && <CardRedeem monster={randomCharacter} onAddToAlbum={
                () => {
                    setStartRedeem(false)
                    router.refresh();
                }
            }/>}

            <div className="bg-creme-600 rounded-b-3xl p-5 py-12 mb-20">
                <div className="flex flex-wrap lg:flex-nowrap max-w-4xl mx-auto items-center">
                    <div className="w-1/3 mx-auto hidden lg:block">
                        <MonsterCard/>
                    </div>
                    <div className="w-full lg:w-2/3 text-center lg:text-left">
                        <div className="pl-0 lg:pl-10">
                            <h1 className="text-leo-500 smoksy text-32 lg:text-44 leading-none">
                                Masz kod do Smoksa?
                            </h1>
                            Wpisz kod z opakowania Smoksów poniżej
                            <form action={dispatch}>
                                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                                    {/* Coupon code */}
                                    <div className="mb-4">
                                        <div className="relative mt-2 rounded-md">
                                                <InputMask
                                                    className="rounded-md bg-white text-44 w-full px-5 py-2 relative z-10 font-mono text-center lg:text-left"
                                                    mask="****-****-****"
                                                    alwaysShowMask={true}
                                                    name="code"
                                                    id="code"
                                                    aria-describedby="coupon-code-error"
                                                />
                                                <input name="userId" defaultValue={userId} className="hidden"/>
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
                                </div>
                                <button
                                    type="submit"
                                    className="text-creme-100 text-16 bg-leo-500 border-2 rounded-full border-plazmus-800 px-10 py-5 inline-block hover:bg-peach-500 cursor-pointer"
                                >
                                    Odbierz Smoksa
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
