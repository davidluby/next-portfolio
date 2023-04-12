import React from 'react'
import Link from 'next/link'
export default function Dropdown() {
  return (
    <div className="absolute flex flex-col w-full mt-2.5 left-0 rounded-b-lg shadow-lg ring-1 ring-black/5 text-black bg-[#BA9653]">
        <Link className="p-[.5rem] hover:bg-[#d3a95a;] text-base" href="/decks">Application</Link>
        <Link className="p-[.5rem] hover:bg-[#d3a95a;] text-base rounded-b-lg" href="/decks_ex">Explanation</Link>
    </div>
  )
}