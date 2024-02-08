'use client'
import React, {useMemo, useState} from 'react';
import {Monster} from "@/app/ui/cards/CardsRedeem";
import CardFace from "@/app/ui/cards/CardFace";
import CardBack from "@/app/ui/cards/CardBack";


interface Props {
    monster?: Monster,
    className?: string
}

export const MonsterCard = ({monster, className}: Props) => {
    const [isActive, setIsActive] = useState(false);
    const [enable_3D_effect, setEnable_3D_effect] = useState(false);
    const [direction_3D_effect, setDirection_3D_effect] = useState(0);

    const changeActiveState = () => {
        setIsActive(!isActive);
    };

    const current_3D_transform = useMemo(() => {
        if (!enable_3D_effect || direction_3D_effect === 0) return '';
        const directionMap = {
            1: {transform: 'perspective(200px) rotateY(-1deg) rotateX(1deg)'},
            2: {transform: 'perspective(200px) rotateY(1deg) rotateX(1deg)'},
            3: {transform: 'perspective(200px) rotateY(-1deg) rotateX(-1deg)'},
            4: {transform: 'perspective(200px) rotateY(1deg) rotateX(-1deg)'},
        };
        // @ts-ignore
        return directionMap[direction_3D_effect];
    }, [enable_3D_effect, direction_3D_effect]);

    return (
        <div className={`relative z-0 group ${className}`} onClick={changeActiveState}>
            <div
                className="overflow-hidden flex flex-wrap items-center relative z-10 w-full transition-all duration-500 rounded-3xl"
                style={{transform: current_3D_transform.transform}}>
                <div
                    className="absolute inset-0 z-10 hidden lg:block" onMouseEnter={() => setEnable_3D_effect(true)}
                    onMouseLeave={() => setEnable_3D_effect(false)}>
                    <span className="w-1/2 h-1/2 absolute top-0 left-0" onMouseEnter={() => setDirection_3D_effect(1)}/>
                </div>
                {monster ? (
                    <CardFace monster={monster} isActive={isActive}/>
                ) : (
                    <CardBack/>
                )}
            </div>
        </div>
    );
};
