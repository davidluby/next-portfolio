import React, { useState } from 'react'
import Link from "next/link"

export default function Nav() {
	const [hide, setHide] = useState(true);

  return (
    <nav className="mb-10 bg-[#333336]/[.125] shadow-lg">
        <div className="flex justify-center items-center">
			<Link href="/" className="nav-logo animate-spin" />
			<Link href="/resume" className="nav-button">Resume</Link>
			<div href="/decks" className="nav-button relative cursor-default" onMouseOver={() => setHide(false)} onMouseLeave={() => setHide(true)}>
					Background
				{ !hide ? 
					<div className="absolute flex flex-col w-full mt-[.6rem] left-0 rounded-b-md shadow-lg ring-1 ring-black/5 bg-gray-200 z-50">
						<Link className="nav-button text-xs" href="/fluids">Fluid Simulation</Link>
						<Link className="nav-button text-xs" href="/collision">2-D Collisions</Link>
						{/*
						<Link className="p-[.5rem] hover:bg-slate-600 text-base" href="/projectile">3-D Projectile</Link>
						*/}
						<Link className="nav-button text-xs" href="/decks">Fullstack App</Link>
						<Link className="nav-button text-xs" href="/mech">Mechatronics</Link>
						<Link className="nav-button text-xs" href="/webgl">WebGL</Link>
						<Link className="nav-button text-xs" href="/iterative">Iterative Methods</Link>
						<Link className="nav-button text-xs rounded-b-md" href="/papers">Papers</Link>
					</div> : null
				}
			</div>
        </div>
    </nav>
  	)
}