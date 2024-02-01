import React, {useMemo} from 'react';
import {Monster} from "@/app/ui/cards/CardsRedeem";

interface Props {
    monster: Monster
    isActive: boolean
}

const CardFace = ({monster, isActive}: Props) => {
    const randomNumber = useMemo(() => Math.floor(Math.random() * 10) + 1, []);

    return (
        <>
            <div
                className={`w-full transition-transform duration-200 ${isActive ? '' : 'delay-200'}`}
                style={isActive ? {perspective: '1000px', transform: 'rotateY(90deg)'} : {}}
            >
                <div
                    className={`bg-creme-100 rounded-3xl p-5 border-4 w-full ${monster.frame}`}
                >
                    <div className="aspect-[3/2]">
                        <img src={monster.image ?? ''} alt=""/>
                    </div>
                    <div className="text-leo-500 font-medium text-16">
                        <div className="smoksy text-32 pt-5 xl:text-36 text-peach-400">
                            {monster.name}
                        </div>
                        <div className="bg-leo-500 text-white -mx-6 rounded-xl p-4 mt-6 relative -mb-6">
                            <div>Smokomoc</div>
                            <div
                                className="text-40 bg-peach absolute right-5 my-auto top-0 bottom-10 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full border-4 border-creme-100"
                            >
                            <span
                                className="absolute inset-0 animate-ball"
                                style={{backgroundImage: 'url(/img/ball.png)', backgroundSize: 'cover'}}
                            ></span>
                                <span className="relative z-10">{monster.power}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`absolute h-full w-full transition-transform duration-200 z-0 ${isActive ? 'delay-200' : ''}`}
                style={isActive ? {} : {perspective: '1000px', transform: 'rotateY(90deg)'}}
            >
                <div className="h-full">
                    <div className="aspect-[3/2] absolute w-full left-0 z-10 bottom-10 scale-75">
                        <img
                            src={monster.image ?? ''}
                            alt={`${monster.name} - Smoksy`}
                            className="animate-motion"
                            style={{animationDelay: `${randomNumber}s`}}
                        />
                    </div>
                    <div className="absolute z-0 inset-0 bg-gradient-to-tl from-[#2a1c54] to-[#714791] mx-auto">
                        <img
                            src={monster.planet}
                            alt=""
                            className="animate-planet max-w-[185%] absolute -bottom-[45%] -left-[50%] right-0 mx-auto"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardFace;
