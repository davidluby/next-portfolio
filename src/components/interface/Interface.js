import React, { useState } from 'react'

import Deck from "@components/interface/Deck"
import New from "@components/buttons/New"
import Save from "@components/buttons/Save"

export default function Interface({ cards, setCards, deck, setDeck }) {

  return (
    <div>
        <div className="flex flex-col justify-evenly border-4 border-slate-400"
            style={{animation : "inAnimation 500ms ease-in"}}>
            <Deck cards={cards} setCards={setCards} />
            </div>
            <div className="flex flex-row justify-evenly border-4 border-yellow-300">
                <New setDeck={setDeck} />
                <Save cards={cards} deck={deck} />
            </div>
        </div>
  )
}