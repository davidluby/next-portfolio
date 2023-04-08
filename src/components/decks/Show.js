import React, { useState } from 'react'
import Card from "@components/decks/Card"
import Edit from "@components/decks/Edit"
import Delete from "@components/decks/Delete"

export default function Show({ setCards, setDeck, setHidden }) {
    const [dataDecks, setDataDecks] = useState("");
    const [empty, setEmpty] = useState(true);

    const Show = () => {
        fetch('https://davidluby.com/api/show_deck', {
            method: "GET",
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
    <div className="flex flex-col justify-center">
        <button className="bg-green-700 hover:bg-green-900 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
                onClick={Show}>
            Show Saved Decks
        </button>
        { !empty ? dataDecks.map(function(deck, idx) {
                    const dataCards = deck.slice(1);
                    const dataDeck = deck[0];

                    return <div className="flex flex-col items-center" key={idx}>
                        <div className="flex flex-row justify-center">
                            {dataCards.map(function(card, jdx) {
                                return <div key={jdx}>
                                        <Card data={card} loc={idx.toString()+jdx.toString()} />
                                    </div>
                                        })
                                    }
                        </div>
                        <div className="flex flex-row justify-evenly">
                            <Edit dataCards={dataCards} setCards={setCards} dataDeck={dataDeck} setDeck={setDeck} setHidden={setHidden} />
                            <Delete dataDeck={dataDeck} />
                            <p>
                                Deck {dataDeck.id} -- Bias: {dataDeck.bias} -- Time saved: {dataDeck.saved}
                            </p>
                        </div>
                        </div>
                }) : null
        }
    </div>
  )
}