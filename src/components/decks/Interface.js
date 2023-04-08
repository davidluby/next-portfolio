import React from 'react'
import Deck from "@components/decks/Deck"
import New from "@components/decks/New"
import Save from "@components/decks/Save"

export default function Interface({ cards, setCards, deck, setDeck }) {

  return (
    <div>
        <div className="flex flex-col justify-evenly"
            style={{animation : "inAnimation 500ms ease-in"}}>
            <Deck cards={cards} setCards={setCards} />
            </div>
            <div className="flex flex-row justify-evenly">
                <New setDeck={setDeck} />
                <Save cards={cards} deck={deck} />
            </div>
        </div>
  )
}