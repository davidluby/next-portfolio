import React from 'react'
import Head from 'next/head'
import TwoCollisions from "@components/simulations/TwoCollisions"
import ThreeProjectile from "@components/simulations/ThreeProjectile"
import TwoFluid from "@components/simulations/TwoFluid"

import App from "@components/decks/App"

export default function Home() {
    
    return (
        <div className="flex flex-col items-center mb-20">
            <Head>
                <title>Homepage</title>
            </Head>
            <h1 className="w-[97%] res:w-5/6 border-b-4 border-yellow-500">Welcome</h1>
            <div className="w-[97%] res:w-5/6 mt-5 tile bg-slate-900">
                <p>
                    Thank you for visiting my website. My name is David Luby, and I am a recent mechanical engineering graduate from the University of New Hampshire. This site&#39;s content is intended to demonstrate both interest and competence in several disciplines I would like to begin my career in.
                </p>
                <p className="mt-4">
                    Below is a collection of projects covered in greater depth on pages under the Background tab. The site is in itself a fullstack web development project. All projects&#39; source code are on my GitHub&#8212;<b>if you see something broken or poorly-done, challenge me to correct it.</b>
                </p>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 mb-5 border-b-4 border-yellow-500">Simulations</h1>
            <TwoFluid name="twoFluid" />
            <div className="flex flex-col items-center res:flex-row res:space-x-5 w-[97%] res:w-5/6">
                <TwoCollisions name="twoCollisions"/>
                <ThreeProjectile />
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 border-b-4 border-yellow-500">Mechatronic Conveyor</h1>
            <div className="flex flex-col items-center res:flex-row justify-between w-[97%] res:w-5/6 mt-5">
                <video controls className="w-1/4">
                    <source src="mech/v1.mp4" type="video/mp4"></source>
                </video>
                <video controls className="w-1/4 my-5 res:my-0">
                    <source src="mech/v2.mp4" type="video/mp4"></source>
                </video>
                <video controls className="w-1/4">
                    <source src="mech/v3.mp4" type="video/mp4"></source>
                </video>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 mb-5 border-b-4 border-yellow-500">Fullstack Application</h1>
            <App />
            <h1 className="w-[97%] res:w-5/6 mt-20 border-b-4 border-yellow-500">Motorized Bike</h1>
            <div className="flex flex-col items-center res:flex-row justify-between w-[97%] res:w-5/6 mt-5">
                <img src="bike.jpg"></img>
            </div>
        </div>
    )
}