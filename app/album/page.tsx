'use client'
import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import {CardRedeem, Monster} from "@/app/ui/cards/CardsRedeem";
import { monsters } from '../lib/placeholder-data';
import {MonsterCard} from "@/app/ui/cards/MonsterCard";

// export const metadata: Metadata = {
//     title: 'Album',
// };


export default function Page() {

    const randomIndex = Math.floor(Math.random() * monsters.length);
    const randomCharacter = monsters[randomIndex];

    const [code, setCode] = useState('');
    const [startRedeem, setStartRedeem] = useState(false);
    const [items, setMonsters] = useState<Monster[]>([monsters[0]])

    const beginRedeemAnimation = (e: any) => {
        e.preventDefault();
        setStartRedeem(true);

    };

    return (
        <div>
            {startRedeem && <CardRedeem monster={randomCharacter} onAddToAlbum={
                () => {
                    setMonsters([...items, randomCharacter])
                    setStartRedeem(false)
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
                            <form onSubmit={beginRedeemAnimation}>
                                <div className="bg-white rounded-md my-5 relative">
                                    <InputMask
                                        mask="**** **** ****"
                                        alwaysShowMask={true}
                                        value={code}
                                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCode(e.target.value)}
                                        className="bg-transparent text-44 w-full px-5 py-2 relative z-10 uppercase font-mono text-center lg:text-left"
                                    />
                                    <span
                                        className="px-5 text-44 tracking-normal text-creme-500 absolute pointer-events-none w-full left-0 right-0 -bottom-3 font-mono">
                  {/*---- ---- ----*/}
                </span>
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
            <div className="gap-4 2xl:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {monsters.map((card) => (
                    <div key={card.id} className="p-4 2xl:p-10">
                        <MonsterCard monster={card}/>
                    </div>
                ))}
                <div className="p-4 2xl:p-10">
                    <MonsterCard className="opacity-70"/>
                </div>
            </div>
        </div>
    );
}

