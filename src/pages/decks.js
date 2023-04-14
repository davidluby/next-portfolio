import React, { useState } from 'react'
import Search from "@components/decks/Search"
import Interface from "@components/decks/Interface"


export default function Decks() {

  const [playerData, setPlayerData] = useState("");
  const [searching, setSearching] = useState(true);

  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({'id': 'null', 'saved': 'null', 'bias': 'null'});
  const [empty, setEmpty] = useState(true);
  const [hidden, setHidden] = useState(true);


  return (
    <div className="flex flex-col items-center px-10">
		<div className="mb-10 w-5/6 px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
			<h1>
				Quick Start
			</h1>
			<p>
				The following application is intended to demonstrate fullstack competency. Please visit the <a className="underline text-blue-700 hover:text-blue-400"
					href="https://main--davidluby.netlify.app/decks_ex"
					target="_blank"
					rel="noopener noreferrer">explanation</a> page for a description of what is going on behind the scenes. Below is really a bug list for things I do not have time to fix. I am heading back to C and microcontrollers.
			</p>
			<p className="mt-4">
				Click on the search bar and type in an NBA player&#x27;s name. <b>Limitations to the search algorithm have the following consequences:</b>
			</p>
			<ul className="list-disc list-inside">
				<li className="ml-10">only one search is allowed each minute (fill decks with repeated cards, or edit an existing deck)</li>
				<li className="ml-10">the player must still be playing in the NBA</li>
				<li className="ml-10">names typed into the search bar should be spelled perfectly</li>
				<li className="ml-10">players with prefixes, suffixes, or hyphens&#8212;anything other than a first and last name&#8212;rarely work</li>
				<li className="ml-10">players traded this season will appear with a blank background and some incorrect data</li>
			</ul>
			<p className="mt-4">
				Make sure to load/refresh the saved decks whenever a deck is saved, overwritten, or deleted, or the changes will not appear. Finally, <b>this works well in Chromium browsers</b> (Chrome, Edge, FireFox, etc.), it does not in Safari, and no others were checked.
			</p>
			<h1 className="mt-4">
				Disclaimer
			</h1>
			<p>
				<i>All player pictures, statistics, and data are property of <a className="underline text-blue-700 hover:text-blue-400"
                href="https://www.basketball-reference.com"
                target="_blank"
                rel="noopener noreferrer">www.basketball-reference.com</a>. This demonstration is intentionally limited to better align with the <a className="underline text-blue-700 hover:text-blue-400"
                href="https://www.sports-reference.com/data_use.html"
                target="_blank"
                rel="noopener noreferrer">guidelines</a> issued by Sports Reference. Measures taken to limit this site&#x27;s footprint on Sports References&#x27; are described on the <a className="underline text-blue-700 hover:text-blue-400"
				href="https://main--davidluby.netlify.app/decks_ex"
				target="_blank"
				rel="noopener noreferrer">explanation</a> page.<b> Data, images, statistics, etc. from Sports Reference are blurred.</b></i>
      		</p>
		</div>
		<Search setPlayerData={setPlayerData} setSearching={setSearching} setHidden={setHidden} />
		<div className="p-10">
			{ !hidden ? <Interface setHidden={setHidden} searching={searching} playerData={playerData} empty={empty} setEmpty={setEmpty}
							cards={cards} setCards={setCards} deck={deck} setDeck={setDeck} />
				: <h1><b>Enter an <i>active</i> NBA player&apos;s name above. Try typing in &#34;Al Horford&#34; (remove quotes) if you need a name.</b></h1>}
		</div>
    </div>
	)
}