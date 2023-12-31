import React, { useState } from 'react'
import Link from "next/link"

export default function Nav() {
	const [hide, setHide] = useState(true);

  return (
    <nav className="sticky w-full top-0 mb-10 flex justify-center bg-slate-700 shadow-lg text-white z-[100]">
        <div className="flex flex-row items-center">
			<Link href="/" className="nav-logo animate-pulse" />
			<Link href="https://www.api.davidluby.com/" className="nav-button">Backend API</Link>
			<Link href="/resume" className="nav-button">Resume</Link>
			<div className="nav-button relative cursor-default w-28" onMouseOver={() => setHide(false)} onMouseLeave={() => setHide(true)}>
					Projects
				{!hide ? 
					<div className="absolute flex flex-col w-full mt-[.625rem] left-0 rounded-b-md bg-slate-700">
						<Link className="nav-button text-xs" href="/trends">Trends</Link>
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