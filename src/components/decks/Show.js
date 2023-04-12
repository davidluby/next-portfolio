import React, { useState } from 'react'
import Card from "@components/decks/Card"
import Edit from "@components/decks/Edit"
import Delete from "@components/decks/Delete"

export default function Show({ empty, setEmpty, setHidden, setCards, setDeck }) {
    const [dataDecks, setDataDecks] = useState();
    const [reveal, setReveal] = useState(true);
    const [status, setStatus] = useState("Load")

    const Show = () => {
        fetch('https://davidluby.com/api/show_deck', {
            method: "GET",
        }
        ).then(
            response => response.json()
            .then(
                data => {
                    setDataDecks(JSON.parse(data));
                    setEmpty(false);
                    setReveal(false);
                    setStatus("Refresh")
                }
            )
        )
    }

  return (
    <div className="flex flex-col items-center my-10">
        <button className="bg-green-700 hover:bg-green-600 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
                onClick={Show}>
            {status} Saved Decks
        </button>
        { (!empty && !reveal) ? dataDecks.map(function(deck, idx) {
                    const dataCards = deck.slice(1);
                    const dataDeck = deck[0];

                    return <div className="flex flex-col items-center mt-20 p-10 shadow-lg rounded-xl ring-1 ring-black/5" key={idx}>
                        <div className="flex flex-row space-x-10">
                            <p className="border-b-2 border-green-700">Deck: {dataDeck.id}</p>
                            <p className="border-b-2 border-green-700">Last saved: {dataDeck.saved}</p>
                        </div>
                        <div className="flex flex-col big:flex-row justify-center my-4">
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