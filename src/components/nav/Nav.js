import React, { useState } from 'react'
import Link from "next/link";
import Dropdown from "./Dropdown"

function Nav() {
	const [hide, setHide] = useState(true);

  return (
    <nav className="mb-10 bg-gradient-to-r from-[#007A33;] to-[#005c26;] text-white shadow-2xl">
        <div className="flex justify-center items-center">
			<Link href="/"><div className="nav-logo"></div></Link>
			<Link href="/resume"><div className="nav-button"><b>Resume</b></div></Link>
			<Link href="/decks">
				<div className="nav-button relative"
					onMouseOver={() => setHide(false)}
					onMouseLeave={() => setHide(true)}>
					<b>B-Ball Cards</b>
					{ !hide ? <Dropdown /> : null }
				</div>
			</Link>


        </div>
    </nav>
  	)
}

export default Nav