import React, {useEffect, useState} from 'react';
import {MonsterCard} from "@/app/ui/cards/MonsterCard";

export type Monster = any

interface Props {
    monster: Monster
    onAddToAlbum: () => void
}

export function CardRedeem({monster, onAddToAlbum}: Props)  {
    const [showCard, setShowCard] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const showCardTimeout = setTimeout(() => {
            setShowCard(true);
        }, 4000);

        const startAnimationTimeout = setTimeout(() => {
            setStartAnimation(true);
        }, 50);

        return () => {
            clearTimeout(showCardTimeout);
            clearTimeout(startAnimationTimeout);
        };
    }, []);

    return (
        <div
            className={`bg-creme-600 fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-300
        ${startAnimation ? 'rounded-none scale-100' : 'rounded-full scale-0'}`}
        >
            <div className="max-w-[300px] relative mb-10 z-0">
                <MonsterCard className="animate-cardspin"/>
                <div className="absolute inset-0">
                    <MonsterCard
                        monster={monster}
                        className={`transition-transform duration-300 ${showCard ? 'scale-100' : 'scale-0'}`}
                    />
                    {showCard && (
                        <>
                            <span
                                className="rounded-full w-20 h-20 bg-creme-100 absolute top-0 left-0 -z-10 pointer-events-none animate-explode"
                            />
                            <span
                                className="rounded-full w-20 h-20 bg-creme-100 absolute m-auto top-0 bottom-0 right-0 -z-10 pointer-events-none animate-explode"
                            />
                            <span
                                className="opacity-0 rounded-full w-16 h-16 bg-peach absolute top-4 -right-4 -z-10 pointer-events-none animate-explode"
                                style={{animationDelay: '0.5s'}}
                            />
                            <span
                                className="opacity-0 rounded-full w-16 h-16 bg-peach absolute top-4 bottom-4 -left-4 -z-10 pointer-events-none animate-explode m-auto scale-150"
                                style={{animationDelay: '0.5s'}}
                            />
                            <span
                                className="opacity-0 rounded-full w-20 h-20 bg-creme-500 absolute bottom-5 left-0 -z-10 pointer-events-none animate-explode scale-150"
                                style={{animationDelay: '0.7s'}}
                            />
                            <span
                                className="opacity-0 rounded-full w-20 h-20 bg-plazmus-500 absolute bottom-5 -right-5 -z-10 pointer-events-none animate-explode scale-150"
                                style={{animationDelay: '0.7s'}}
                            />
                        </>
                    )}
                </div>
            </div>
            {showCard && (
                <a
                    onClick={(e) => {
                        e.preventDefault()
                        onAddToAlbum()
                    }}
                    className="text-creme-100 text-16 bg-peach-500 border-2 rounded-full border-plazmus-800 px-10 py-5 inline-block hover:bg-leo-500 cursor-pointer"
                >
                    Dodaj do Albumu!
                </a>
            )}
        </div>
    );
};

