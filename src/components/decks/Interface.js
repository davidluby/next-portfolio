import React, { useState } from 'react'
import Card from "@components/decks/Card"
import Add from "@components/decks/Add"
import Deck from "@components/decks/Deck"
import New from "@components/decks/New"
import Save from "@components/decks/Save"
import ExpandCards from "@components/decks/ExpandCards"

export default function Interface({ searching, playerData, empty, setEmpty, cards, setCards, deck, setDeck }) {

  return (
    <div className="shadow-lg rounded-xl ring-1 ring-black/5 p-10">
		<div className="flex flex-row justify-center my-5 space-x-20">
			{ !searching ? <div className="flex items-center" style={{animation : "inAnimation 500ms ease-in"}}>
				<Card data={playerData} loc="main" />
				</div> : null}
			{ !empty ? <div className="w-[28rem]" style={{animation : "inAnimation 500ms ease-in"}}>
				<div className="flex flex-row justify-evenly space-x-10">
					<p className="border-b-2 border-green-700">Deck: {deck.id}</p>
					<p className="border-b-2 border-green-700">Last saved: {deck.saved}</p>
        		</div>
        		<Deck cards={cards} setCards={setCards} />
      			</div>
				: null }
		</div>
		<div className="flex flex-row justify-evenly">
			<Add playerData={playerData} cards={cards} setCards={setCards} setEmpty={setEmpty} />
			{ !empty ? <ExpandCards /> : null}
			{ !empty ? <Save cards={cards} deck={deck} /> : null}
			{ !empty ? <New setDeck={setDeck} /> : null}
		</div>
    </div>
  )
}