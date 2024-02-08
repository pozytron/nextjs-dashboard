import React from 'react';
import {fetchUserMonsters} from "@/app/lib/data/user_monsters";
import {MonsterCard} from "@/app/ui/cards/MonsterCard";
import {Monster} from "@/app/ui/cards/CardsRedeem";

export async function MonstersAlbum({userId}: { userId: string }) {
    const monsters = await fetchUserMonsters(userId)

    return (
        <div>
            <div className="gap-4 2xl:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {monsters.map((monster) => (
                    <div key={monster.id} className="p-4 2xl:p-10">
                        <MonsterCard monster={monster as Monster}/>
                    </div>
                ))}
                <div key={"nocard"} className="p-4 2xl:p-10">
                    <MonsterCard className="opacity-70"/>
                </div>
            </div>
        </div>
    )
        ;
}

