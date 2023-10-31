import React from 'react'

import CurrentCard from './CurrentCard'

import Edit from "@components/decks/Edit"
import Delete from "@components/decks/Delete"

function StoredDecks({ stored, setStored, setCurrent, setEmpty }) {
    const toFront = (card) => {
		const id = "#front-" + card;
        const flip = document.querySelector(id);
		flip.classList.toggle("z-0");
        flip.classList.toggle("z-50");
	};

    return (
        <div className="flex flex-col items-center w-full">
            {stored.decks.map(function(deck) {
            return <div key={deck.id}
                className="flex flex-col items-center w-[97%] res:w-5/6 p-5 app:p-12 mt-10 shadow-lg rounded-xl ring-1 ring-black/5 parquet">
                <div className="flex flex-row space-x-10 font-bold">
                    <p className="py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Deck: {deck.id}</p>
                    <p className="py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Last saved: {deck.saved}</p>
                    <p className="py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Bias: {deck.bias}</p>
                </div>
                <div className="flex flex-row justify-center my-4 -space-x-[20.5rem] fhd:-space-x-0 scale-75 app:scale-100">
                        {deck.cards.map(function(card) {
                        return <div key={card.cardId}
                                    className="z-0 transition-all ease-in duration-300"
                                    loc={card.cardId}
                                    id={"front-" + card.cardId}
                                    onClick={() => toFront(card.cardId)}>
                                    <CurrentCard cardData={card} loc={"front" + card.cardId} />
                                </div>
                    })}
                </div>
                <div className="flex flex-row space-x-10">
                    <Edit setCurrent={setCurrent} deck={deck} setEmpty={setEmpty} />
                    <Delete id={deck.id} setStored={setStored} />
                </div>
            </div>
            })}
        </div>
    )
}

export default StoredDecks