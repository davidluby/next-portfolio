import React, { useState } from 'react'
import Search from "@components/decks/Search"
import Show from "@components/decks/Show"


export default function Decks() {

  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({'id': 'null', 'saved': 'null', 'bias': 'null'});
  const [hidden, setHidden] = useState(true);

  return (
    <div className="flex flex-col items-center -mt-5 px-10 border-4 border-red-300">
      <Search cards={cards} setCards={setCards} deck={deck} setDeck={setDeck} hidden={hidden} setHidden={setHidden} />
      <Show setCards={setCards} setDeck={setDeck} hidden={hidden} setHidden={setHidden} />
    </div>
  )
}