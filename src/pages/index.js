import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import TwoCollisions from "@components/simulations/TwoCollisions"
//import ThreeProjectile from "@components/simulations/ThreeProjectile"
import TwoFluid from "@components/simulations/TwoFluid"
import Gl_triangle from "@components/simulations/GL_triangle"
import GL_box from "@components/simulations/GL_box"
import GL_canvas from "@components/simulations/GL_canvas"

import App from "@components/decks/App"

export default function Home() {
    
    return (
        <div className="flex flex-col items-center mb-20">
            <Head>
                <title>Homepage</title>
            </Head>
            <h1 className="w-[97%] res:w-5/6 border-b-4 border-yellow-500">Welcome</h1>
            <div className="w-[97%] res:w-5/6 mt-5 tile">
                <p>
                    Thank you for visiting my website. My name is David Luby, and I am a recent mechanical engineering graduate from the University of New Hampshire. This site is intended to demonstrate interests and abilities across software, firmware, and mechanical engineering.
                </p>
                <p className="mt-4">
                    Below is a collection of projects&mdash;the site itself being one of them&mdash;covered in greater depth on pages under the Background tab. All projects&#39; source code are on my&nbsp;
                    <Link href="https://github.com/davidluby" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</Link>
                    &#8212;<b>if you see something broken or poorly-done, challenge me to correct it.</b>
                </p>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 mb-5 border-b-4 border-yellow-500">Simulations</h1>
            {/*<TwoFluid name="twoFluid" />*/}
            <div className="flex flex-col items-center res:flex-row justify-center res:space-x-5 w-[97%] res:w-5/6">
                <TwoFluid name="twoFluid" />
                <TwoCollisions name="twoCollisions"/>
                {/*<ThreeProjectile />*/}
            </div>
            <div className="flex flex-col items-center res:flex-row justify-center res:space-x-5 w-[97%] res:w-5/6 mt-5">
                <GL_canvas name="GL_canvas" />
                <GL_box name="GL_box" />
                <Gl_triangle name="GL_triangle" />
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 mb-5 border-b-4 border-yellow-500">
                <Link href="/decks_ex" className="hover:text-yellow-500 transition-all duration-500">Fullstack Application</Link>
            </h1>
            <App />
            <h1 className="w-[97%] res:w-5/6 mt-20 border-b-4 border-yellow-500">Mechatronic Color Sorting Conveyor</h1>
            <div className="flex flex-row flex-wrap justify-evenly w-[97%] res:w-5/6 mt-5">
                <iframe className="tile w-[300px] h-[500px]" src="https://www.youtube.com/embed/8P3UF1Z6qRs" title="v1" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <iframe className="tile w-[300px] h-[500px]" src="https://www.youtube.com/embed/--vCE5AsHIY" title="v2" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <iframe className="tile w-[300px] h-[500px]" src="https://www.youtube.com/embed/XdCFYtW8jBc" title="v3" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 border-b-4 border-yellow-500">Motorized Bike</h1>
            <div className="flex flex-col items-center res:flex-row justify-center space-y-5 res:space-y-0 res:space-x-5 w-[97%] res:w-5/6 mt-5">
                <img src="bike.jpg" className="tile"></img>
                <p className="tile w-full res:w-2/5">
                    Mounting a four-stroke engine to a pedal bike was the easy part of this project&#8212;maintenence was the true challenge. 49 CC&#39;s of vibrations really leaves a mark on a $100 Huffy Cranbrook from Walmart. Making sure this was safe to ride required several modifications as its mileage ballooned.
                </p>
            </div>
        </div>
    )
}