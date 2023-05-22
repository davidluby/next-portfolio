import React, { useState, useEffect } from 'react'
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
	const [status, setStatus] = useState("Load")

	const toFront = (idx, jdx) => {
		const id = "#front-" + idx + jdx
        const flip = document.querySelector(id)
		flip.classList.toggle("z-0")
        flip.classList.toggle("z-50")
	}
	
	useEffect(() => {
		fetch('/api/show_deck', {
			method: "GET",
		}
		).then(
			response => response.json()
			.then(
				data => {
					setDataDecks(JSON.parse(data));
				}
			)
		)

		if (!reveal) {
			setStatus("Refresh");
		}
	}, [dataDecks])

	return (
		<div className="flex flex-col items-center w-full">
			<div className="flex flex-col items-center w-[97%] res:w-5/6 p-5 app:p-12 mt-10 shadow-lg rounded-xl ring-1 ring-black/5 parquet">
			<h1>Click or tap to flip cards.</h1>
				<div className="flex flex-col app:flex-row app:justify-evenly items-center w-full">
					{ !searching ? <div className="flex flex-col items-center" style={{animation : "inAnimation 500ms ease-in"}}>
						<Card data={playerData} loc="main" />
						</div> : null}
					{ !empty ? <div className="flex flex-col items-center w-full app:w-[28rem]" style={{animation : "inAnimation 500ms ease-in"}}>
							<div className="flex flex-row justify-evenly w-full mt-5 app:mt-0 font-bold">
								<p className="py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Deck: {deck.id}</p>
								<p className="py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Last saved: {deck.saved}</p>
							</div>
						<Deck cards={cards} setCards={setCards} />
						</div>
						: null
					}
				</div>
				<div className="flex flex-col app:flex-row items-center justify-center w-full mt-5 space-y-5 app:space-y-0 app:space-x-5">
					<Add playerData={playerData} cards={cards} setCards={setCards} setEmpty={setEmpty} />
					{ !empty ? <New setDeck={setDeck} /> : null}
					{ !empty ? <Save cards={cards} deck={deck} setDataDecks={setDataDecks} setEmpty={setEmpty} setReveal={setReveal} /> : null}
					{ (!empty && (cards.length > 1)) ? <ExpandCards /> : null}
					<Help />
				</div>
				<Show status={status} setDataDecks={setDataDecks} setEmpty={setEmpty} setReveal={setReveal} />
			</div>
			{ (!empty && !reveal) ? dataDecks.map(function(deck, idx) {
				const dataCards = deck.slice(1);
				const dataDeck = deck[0];
				return <div key={dataDeck.id}
							className="flex flex-col items-center w-[97%] res:w-5/6 p-5 app:p-12 mt-10 shadow-lg rounded-xl ring-1 ring-black/5 parquet">
						<div className="flex flex-row space-x-10 font-bold">
							<p className="py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Deck: {dataDeck.id}</p>
							<p className="py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Last saved: {dataDeck.saved}</p>
						</div>
						<div className="flex flex-row justify-center my-4 -space-x-[20.5rem] fhd:-space-x-0 scale-75 app:scale-100">
							{dataCards.map(function(card, jdx) {
								return <div key={jdx}
											className="z-0 transition-all ease-in duration-300"
											loc={idx+jdx}
											id={"front-" + idx + jdx}
											onClick={() => toFront(idx, jdx)}>
										<Card data={card} loc={"front" + idx + jdx} />
									</div>
										})
									}
						</div>
						<div className="flex flex-row space-x-10">
							<Edit dataCards={dataCards} setCards={setCards} dataDeck={dataDeck} setDeck={setDeck} setHidden={setHidden} />
							<Delete dataDeck={dataDeck} setDataDecks={setDataDecks} setEmpty={setEmpty} setReveal={setReveal} />
						</div>
					</div>
			}) : null
        }
		</div>
	)
}