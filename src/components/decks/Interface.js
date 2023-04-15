import React from 'react'
import Card from "@components/decks/Card"
import Add from "@components/decks/Add"
import Deck from "@components/decks/Deck"
import New from "@components/decks/New"
import Save from "@components/decks/Save"
import ExpandCards from "@components/decks/ExpandCards"
import Show from "@components/decks/Show"
import Help from "@components/decks/Help"

export default function Interface({ setHidden, searching, playerData, empty, setEmpty, cards, setCards, deck, setDeck }) {

	return (
		<div className="w-[97%] res:w-5/6 px-5 py-5 res:p-12 mt-20 shadow-lg rounded-xl ring-1 ring-black/5">
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
			<div className="flex flex-row justify-center items-center space-x-2">
				<Help />
				<Add playerData={playerData} cards={cards} setCards={setCards} setEmpty={setEmpty} />
				{ !empty ? <Save cards={cards} deck={deck} /> : null}
				{ !empty ? <New setDeck={setDeck} /> : null}
				{ (!empty && (cards.length > 1)) ? <ExpandCards /> : null}
			</div>
			<Show setHidden={setHidden} empty={empty} setEmpty={setEmpty} setCards={setCards} setDeck={setDeck} />
		</div>
	)
}