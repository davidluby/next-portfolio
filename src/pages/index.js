import React from 'react'

import Projectile from "@components/simulations/Projectile"
import ThreeProjectile from "@components/simulations/ThreeProjectile"
import Fluids from "@components/simulations/Fluids"

import App from "@components/decks/App"

export default function Home() {
    
    return (
        <div className="flex flex-col items-center mb-20">
            <div className="w-[97%] res:w-5/6 p-5 res:p-12 shadow-lg rounded-xl ring-1 ring-black/5">
                <h1>
                    Welcome
                </h1>
                <p>
                    Thank you for visiting my website. My name is David Luby, and I am a recent mechanical engineering graduate from the University of New Hampshire. This site&#39;s content is intended to demonstrate both interest and competence in several disciplines I would like to begin my career in.
                </p>
                <p className="mt-4">
                    This homepage is a collection of projects covered in greater depth on pages under the Background tab. The site is in itself a fullstack web development project. All projects&#39; source code are on my GitHub&#8212;<b>if you see something broken or poorly-done, challenge me to correct it.</b>
                </p>
            </div>
            <div className="flex flex-col items-center res:flex-row justify-between w-[97%] res:w-5/6 mt-20">
                <Projectile name="projectile"/>
                <ThreeProjectile />
            </div>
            <Fluids />

            <App />

        </div>
    )
}