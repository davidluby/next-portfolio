import React, { useState } from 'react'
import Card from "@components/decks/Card"
import Deck from "@components/decks/Deck"
import Add from "@components/decks/Add"
import Save from "@components/decks/Save"
import New from "@components/decks/New"
import ExpandCards from "@components/decks/ExpandCards"
import Help from "@components/decks/Help"
import Show from "@components/decks/Show"
import Edit from "@components/decks/Edit"
import Delete from "@components/decks/Delete"

export default function Interface({ setHidden, searching, playerData, empty, setEmpty, cards, setCards, deck, setDeck }) {
	const [dataDecks, setDataDecks] = useState();
    const [reveal, setReveal] = useState(true);

	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-[97%] app:w-5/6 p-5 app:p-12 mt-20 shadow-lg rounded-xl ring-1 ring-black/5">
				<div className="flex flex-col app:flex-row app:justify-evenly items-center w-full mb-10">
					{ !searching ? <div className="flex items-center" style={{animation : "inAnimation 500ms ease-in"}}>
						<Card data={playerData} loc="main" />
						</div> : null}
					{ !empty ? <div className="w-[28rem]" style={{animation : "inAnimation 500ms ease-in"}}>
						<Deck cards={cards} setCards={setCards} />
						<div className="flex flex-row justify-evenly">
							<p className="border-b-2 border-green-700">Deck: {deck.id}</p>
							<p className="border-b-2 border-green-700">Last saved: {deck.saved}</p>
						</div>
						</div>
						: null }
				</div>
				<div className="flex flex-col app:flex-row items-center justify-center w-full space-y-5 app:space-y-0 app:space-x-5">
					<Add playerData={playerData} cards={cards} setCards={setCards} setEmpty={setEmpty} />
					{ !empty ? <Save cards={cards} deck={deck} /> : null}
					{ !empty ? <New setDeck={setDeck} /> : null}
					{ (!empty && (cards.length > 1)) ? <ExpandCards /> : null}
					<Help />
				</div>
				<Show setDataDecks={setDataDecks} setEmpty={setEmpty} setReveal={setReveal} />
			</div>
			{ (!empty && !reveal) ? dataDecks.map(function(deck, idx) {
                    const dataCards = deck.slice(1);
                    const dataDeck = deck[0];

                    return <div className="flex flex-col items-center w-[97%] app:w-5/6 p-5 app:p-12 mt-10 shadow-lg rounded-xl ring-1 ring-black/5"
                                key={idx}>
                        <div className="flex flex-row space-x-10">
                            <p className="border-b-2 border-green-700">Deck: {dataDeck.id}</p>
                            <p className="border-b-2 border-green-700">Last saved: {dataDeck.saved}</p>
                        </div>
                        <div className="flex flex-row justify-center my-4 -space-x-[20.5rem] app:-space-x-0 scale-75 app:scale-100">
                            {dataCards.map(function(card, jdx) {
                                return <div key={jdx}>
                                        <Card data={card} loc={idx.toString()+jdx.toString()} />
                                    </div>
                                        })
                                    }
                        </div>
                        <div className="flex flex-row space-x-10">
                            <Edit dataCards={dataCards} setCards={setCards} dataDeck={dataDeck} setDeck={setDeck} setHidden={setHidden} />
                            <Delete dataDeck={dataDeck} />
                        </div>
                        </div>
                }) : null
        }
		</div>
	)
}