import React, { useState, useEffect } from 'react'

import Card from "@components/card/Card"
import Edit from "@components/buttons/Edit"
import Delete from "@components/buttons/Delete"

export default function Show({ setCards, setDeck, setHidden }) {
    const [dataDecks, setDataDecks] = useState("");
    const [empty, setEmpty] = useState(true);

    const Show = () => {
        fetch('http://18.218.119.251/api/show_deck', {
            method: "GET"
        }
        ).then(
            response => response.json()
            .then(
                data => {
                    setDataDecks(JSON.parse(data))
                    setEmpty(false)
                }
            )
        )
    }

  return (
    <div>
        <button className="bg-green-700 hover:bg-green-900 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
                onClick={Show}>
            Show Saved Decks
        </button>
        { !empty ? dataDecks.map(function(deck, idx) {
                    const dataCards = deck.slice(1);
                    const dataDeck = deck[0];

                    return <div key={idx}>
                            <Edit dataCards={dataCards} setCards={setCards} dataDeck={dataDeck} setDeck={setDeck} setHidden={setHidden} />
                            <Delete dataDeck={dataDeck} />
                                Deck {dataDeck.id} -- Bias: {dataDeck.bias} -- Time saved: {dataDeck.saved}
                                <div className="flex flex-row justify-center">
                                    {dataCards.map(function(card, jdx) {
                                        return <div key={jdx}>
                                                    <Card data={card} loc={idx.toString()+jdx.toString()} />
                                                </div>
                                        })
                                    }
                                </div>
                            </div>
                }) : null
        }
    </div>
  )
}