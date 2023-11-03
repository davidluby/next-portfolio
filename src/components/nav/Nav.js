import React, { useState } from 'react'
import Link from "next/link"

export default function Nav() {
	const [hide, setHide] = useState(true);

  return (
    <nav className="flex justify-center mb-10 bg-[#333336]/[.125] bg-gray-100 shadow-lg sticky top-0 z-50">
        <div className="flex flex-row items-center">
			<Link href="/" className="nav-logo animate-pulse" />
			<Link href="/resume" className="nav-button">Resume</Link>
			<div className="nav-button relative cursor-default w-28" onMouseOver={() => setHide(false)} onMouseLeave={() => setHide(true)}>
					Projects
				{!hide ? 
					<div className="absolute flex flex-col w-full mt-[.6rem] left-0 rounded-b-md shadow-lg ring-1 ring-black/5 bg-gray-200 z-50">
						<Link className="nav-button text-xs" href="/fluids">Fluid Simulation</Link>
						<Link className="nav-button text-xs" href="/collision">2-D Collisions</Link>
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