import React, { useState } from 'react'
import Link from "next/link";
import Dropdown from "./Dropdown"

export default function Nav() {
	const [hide, setHide] = useState(true);

  return (
    <nav className="mb-10 bg-gradient-to-r from-[#007A33;] to-[#005c26;] text-white shadow-2xl">
        <div className="flex justify-center items-center">
			<Link href="/" className="nav-logo" />
			<Link href="/resume" className="nav-button"><b>Resume</b></Link>
			<Link href="/decks" className="nav-button relative" onMouseOver={() => setHide(false)} onMouseLeave={() => setHide(true)}>
				<b>B-Ball Cards</b>
				{ !hide ? <Dropdown /> : null }
			</Link>
        </div>
    </nav>
  	)
}