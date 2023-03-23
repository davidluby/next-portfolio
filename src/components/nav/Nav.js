// Use RFCE to 

import React from 'react'
import Link from "next/link";


function Nav() {
  return (
    <nav className="mb-10 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <ul className="flex items-center justify-center">
            <Link href="/"><li className="nav-logo"></li></Link>
            <Link href="/resume"><li className="nav-button">Resume</li></Link>
            <Link href="/decks"><li className="nav-ball"></li></Link>
        </ul>
    </nav>
  )
}

export default Nav