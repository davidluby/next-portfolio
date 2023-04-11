import React, { useState } from 'react'
import Search from "@components/decks/Search"
import Show from "@components/decks/Show"
import Interface from "@components/decks/Interface"


export default function Decks() {

  const [playerData, setPlayerData] = useState("");
  const [searching, setSearching] = useState(true);

  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({'id': 'null', 'saved': 'null', 'bias': 'null'});
  const [empty, setEmpty] = useState(true);
  const [hidden, setHidden] = useState(true);


  return (
    <div className="flex flex-col items-center -mt-5 px-10">
		<div className="my-10 w-2/3">
			<p>
				The application below communicates with an API hosted on an AWS Amazon Linux 2 instance to demonstrate fullstack CRUD functionality. Here are a few limitations:
			</p>
			<p className="text-xs text-center">All player statistics, pictures, and data taken from <a className="underline text-blue-700 hover:text-blue-400"
                href="https://www.basketball-reference.com"
                target="_blank"
                rel="noopener noreferrer">www.basketball-reference.com</a>. This demonstration is intentionally limited to respect the <a className="underline text-blue-700 hover:text-blue-400"
                href="https://www.sports-reference.com/data_use.html"
                target="_blank"
                rel="noopener noreferrer">guidlines</a> issued by Sports Reference.
            </p>
		</div>
		<Search setPlayerData={setPlayerData} setSearching={setSearching} setHidden={setHidden} />
		<div className="p-10 mb-10">
			{ !hidden ? <Interface searching={searching} playerData={playerData} empty={empty} setEmpty={setEmpty}
							cards={cards} setCards={setCards} deck={deck} setDeck={setDeck} />
				: <p>Enter an <i>active</i> NBA player&apos;s name above</p>}
		</div>
      	<Show setHidden={setHidden} empty={empty} setEmpty={setEmpty} setCards={setCards} setDeck={setDeck} />
    </div>
  )
}