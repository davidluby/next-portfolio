import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import TwoCollisions from "@components/simulations/TwoCollisions"
import ThreeFluid from "@src/components/simulations/ThreeFluid"

import App from "@components/decks/App"

export default function Home() {
    
    return (
        <div className="flex flex-col items-center mb-20">
            <Head>
                <title>Homepage</title>
            </Head>
            <h1 className="w-[97%] res:w-5/6 mb-5 border-b-4 border-yellow-500 z-10 text-white">Welcome</h1>
            <div className="flex flex-col items-center res:flex-row res:items-center res:justify-evenly w-[97%] res:w-5/6">
                <div className="res:relative flex flex-col items-center justify-center res:items-end res:w-[26rem] res:h-[8rem] px-3 py-5 shadow-lg rounded-xl ring-1 ring-black/5 text-center res:text-left bg-white z-10">
                    <img className="res:absolute res:-left-12 w-60 res:w-[12rem] rounded-full shadow-lg" src="headshot.jpg"></img>
                    <div>
                        <ul className="flex flex-row items-center justify-center res:justify-start mt-2 res:mt-0 space-x-2">
                            <h2>
                                David Luby
                            </h2>
                            <span className="border-[1px] border-black h-4"></span>
                            <li className ="flex items-center justify-center w-7 h-7">
                                <Link href="https://linkedin.com/in/david-luby/" className="logo-linked w-6 h-6 inline-block bg-center bg-no-repeat" target="_blank" rel="noopener noreferrer"></Link>
                            </li>
                            <span className="border-[1px] border-black h-4"></span>
                            <li className="flex items-center justify-center w-7 h-7">
                                <Link href="https://github.com/davidluby" className="logo-github w-6 h-6 inline-block bg-center bg-no-repeat rounded-full" target="_blank" rel="noopener noreferrer"></Link>
                            </li>
                        </ul>
                        <p>
                            <i>BS, Mechanical Engineering</i>
                        </p>
                        <p>
                            University of New Hampshire 2022
                        </p>
                    </div>
                </div>
                <p className="tile w-full res:w-1/3 mt-5">
                    This website is a collection of my favorite projects. You can see more detail under the Projects tab or by clicking pulsing gold text. All projects&#39; source code are on my&nbsp;
                    <Link href="https://github.com/davidluby" className="underline text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</Link>. Try it on mobile!
                </p>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 mb-5 border-b-4 border-yellow-500 z-10 text-white">Simulations</h1>
            <div className="flex flex-col w-full items-center space-y-5">
                <div className="flex flex-col items-center res:flex-row justify-center space-y-5 res:space-y-0 res:space-x-5 w-[97%] res:w-5/6">
                    <ThreeFluid name="threeFluid" />
                    <TwoCollisions name="twoCollisions"/>
                </div>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 border-b-4 border-yellow-500 z-10">
                <Link href="/mech" className="text-yellow-500 transition-all duration-500 animate-pulse">Mechatronic Color Sorting Conveyor</Link>
            </h1>
            <div className="flex flex-wrap justify-evenly w-[97%] res:w-5/6">
                <div className="tile w-[300px] h-[500px] mt-5">
                    <iframe className="rounded-md w-full h-full shadow-xl" src="https://www.youtube.com/embed/XdCFYtW8jBc" title="v3" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="tile w-[300px] h-[500px] mt-5">
                    <iframe className="rounded-md w-full h-full shadow-xl" src="https://www.youtube.com/embed/--vCE5AsHIY" title="v2" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                
                <div className="tile w-[300px] h-[500px] mt-5">
                    <iframe className="rounded-md w-full h-full shadow-xl" src="https://www.youtube.com/embed/8P3UF1Z6qRs" title="v1" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 mb-5 border-b-4 border-yellow-500 z-10">
                <Link href="/decks" className="text-yellow-500 transition-all duration-500 animate-pulse">Fullstack Basketball Card Deck App</Link>
            </h1>
            <App />
            <div id="helpID" className="w-[97%] res:w-5/6 mt-10 tile">
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
                        &nbsp;issued by Sports Reference. Measures taken to limit this site&#x27;s footprint on Sports Reference&#x27;s are described on the&nbsp;
                        <Link className="underline text-blue-500 hover:text-blue-400" href="/decks" target="_blank" rel="noopener noreferrer">explanation</Link>
                        &nbsp;page.<b> Data, images, statistics, etc. from Sports Reference are blurred.</b>
                    </i>
                </p>
            </div>
            <h1 className="w-[97%] res:w-5/6 mt-20 border-b-4 border-yellow-500 z-10 text-white">Motorized Bike</h1>
            <div className="flex flex-col items-center res:flex-row justify-center space-y-5 res:space-y-0 res:space-x-5 w-[97%] res:w-5/6 mt-5">
                <div className="tile">
                    <img src="bike.jpg" className="rounded-md shadow-xl"></img>
                </div>
                <p className="tile w-full res:w-2/5">
                    Mounting a four-stroke engine to a pedal bike was the easy part of this project&#8212;maintenence was the true challenge. 49 CC&#39;s of vibrations really leaves a mark on a $100 Huffy Cranbrook from Walmart. Making sure this was safe to ride required several modifications as its mileage ballooned.
                </p>
            </div>
        </div>
    )
}