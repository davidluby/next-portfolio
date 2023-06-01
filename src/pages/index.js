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
                    Thank you for visiting my website. My name is David Luby, and I am a recent mechanical engineering graduate from the University of New Hampshire. This site is intended to demonstrate interests and abilities in software, firmware, and mechanical engineering.
                </p>
                <p className="mt-4">
                    Below is a collection of projects&mdash;the site itself being one of them&mdash;covered in greater depth on pages under the Background tab. All projects&#39; source code are on my&nbsp;
                    <Link href="https://github.com/davidluby" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</Link>
                    &#8212;<b>if you see something broken or poorly-done, challenge me to correct it.</b>
                </p>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 mb-5 border-b-4 border-yellow-500">Simulations</h1>
            {/*<TwoFluid name="twoFluid" />*/}
            <div className="flex flex-col w-full items-center space-y-5">
                <div className="flex flex-col items-center res:flex-row justify-center space-y-5 res:space-y-0 res:space-x-5 w-[97%] res:w-5/6">
                    <TwoFluid name="twoFluid" />
                    <TwoCollisions name="twoCollisions"/>
                    {/*<ThreeProjectile />*/}
                </div>
                <div className="flex flex-col items-center res:flex-row justify-center space-y-5 res:space-y-0 res:space-x-5 w-[97%] res:w-5/6">
                    <GL_canvas name="GL_canvas" />
                    <GL_box name="GL_box" />
                    <Gl_triangle name="GL_triangle" />
                </div>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 mb-5 border-b-4 border-yellow-500">
                <Link href="/decks_ex" className="hover:text-yellow-500 transition-all duration-500">Fullstack Basketball Card Deck App</Link>
            </h1>
            <App />
            <div id="helpID" className="w-[97%] res:w-5/6 mt-10 tile bg-slate-900">
                <h1>
                    Quick Start
                </h1>
                <p>
                    The above application is intended to demonstrate fullstack competency. Please visit the&nbsp;
                    <Link className="underline text-blue-500 hover:text-blue-400" href="/decks" target="_blank" rel="noopener noreferrer">explanation</Link>
                    &nbsp;page for a description of what is going on behind the scenes.
                </p>
                <p className="mt-4">
                    <b>Click on the search bar and type in an NBA player&#x27;s name.</b> Limitations to the search algorithm have the following consequences:
                </p>
                <ul className="list-disc list-inside res:ml-10">
                    <li>only one search is allowed each minute (fill decks with repeated cards, or edit an existing deck)</li>
                    <li>the player must still be playing in the NBA</li>
                    <li>names typed into the search bar should be spelled perfectly</li>
                    <li>players with prefixes, suffixes, or hyphens&#8212;anything other than a first and last name&#8212;rarely work</li>
                    <li>players traded this season will appear with a blank background and some incorrect data</li>
                    <li>player data is blurred</li>
                </ul>
                <h1 className="mt-4">
                    Disclaimer
                </h1>
                <p>
                    <i>
                        All player pictures, statistics, and data are property of&nbsp;
                        <Link className="underline text-blue-500 hover:text-blue-400" href="https://www.basketball-reference.com" target="_blank" rel="noopener noreferrer">www.basketball-reference.com</Link>
                        . This demonstration is intentionally limited to better align with the&nbsp;
                        <Link className="underline text-blue-500 hover:text-blue-400" href="https://www.sports-reference.com/data_use.html" target="_blank" rel="noopener noreferrer">guidelines</Link>
                        &nbsp;issued by Sports Reference. Measures taken to limit this site&#x27;s footprint on Sports References&#x27; are described on the&nbsp;
                        <Link className="underline text-blue-500 hover:text-blue-400" href="/decks_ex" target="_blank" rel="noopener noreferrer">explanation</Link>
                        &nbsp;page.<b> Data, images, statistics, etc. from Sports Reference are blurred.</b>
                    </i>
                </p>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 border-b-4 border-yellow-500">
                <Link href="/mech" className="hover:text-yellow-500 transition-all duration-500">Mechatronic Color Sorting Conveyor</Link>
            </h1>
            <div className="flex flex-wrap justify-evenly w-[97%] res:w-5/6">
                <iframe className="tile w-[300px] h-[500px] mt-5" src="https://www.youtube.com/embed/8P3UF1Z6qRs" title="v1" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <iframe className="tile w-[300px] h-[500px] mt-5" src="https://www.youtube.com/embed/--vCE5AsHIY" title="v2" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <iframe className="tile w-[300px] h-[500px] mt-5" src="https://www.youtube.com/embed/XdCFYtW8jBc" title="v3" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
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