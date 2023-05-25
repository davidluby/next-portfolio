import React, { useState } from 'react'
import Link from "next/link"

export default function Nav() {
	const [hide, setHide] = useState(true);

  return (
    <nav className="mb-10 bg-slate-700 shadow-lg">
        <div className="flex justify-center items-center text-white">
			<Link href="/" className="nav-logo" />
			<Link href="/resume" className="nav-button text-2xl"><b>Resume</b></Link>
			<div href="/decks" className="nav-button relative cursor-default text-2xl" onMouseOver={() => setHide(false)} onMouseLeave={() => setHide(true)}>
					<b>Background</b>
				{ !hide ? 
					<div className="absolute flex flex-col w-full mt-4 left-0 rounded-b-md shadow-lg ring-1 ring-black/5 text-white bg-slate-800 z-50">
						<Link className="p-[.5rem] nav-button text-base" href="/fluids">Fluid Simulation</Link>
						<Link className="p-[.5rem] nav-button text-base" href="/collision">2-D Collisions</Link>
						{/*
						<Link className="p-[.5rem] hover:bg-slate-600 text-base" href="/projectile">3-D Projectile</Link>
						*/}
						<Link className="p-[.5rem] nav-button text-base" href="/decks_ex">Fullstack App</Link>
						<Link className="p-[.5rem] nav-button text-base" href="/mech">Mechatronics</Link>
						<Link className="p-[.5rem] nav-button text-base" href="/webgl">WebGL</Link>
						<Link className="p-[.5rem] nav-button text-base rounded-b-md" href="/iterative">Iterative Methods</Link>
						{/*
						<Link className="p-[.5rem] hover:bg-slate-600 text-base rounded-b-md" href="/bike">Motorized Bike</Link>
						*/}
					</div> : null
				}
			</div>
        </div>
    </nav>
  	)
}