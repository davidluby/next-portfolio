import React, { useState } from 'react'
import Search from "@components/decks/Search"
import Interface from "@components/decks/Interface"


export default function App() {

  const [playerData, setPlayerData] = useState("");
  const [searching, setSearching] = useState(true);

  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({'id': 'null', 'saved': 'null', 'bias': 'null'});
  const [empty, setEmpty] = useState(true);
  const [hidden, setHidden] = useState(true);


  return (
    <div className="flex flex-col items-center mb-10 w-full text-white">
      <Search setPlayerData={setPlayerData} setSearching={setSearching} setHidden={setHidden} hidden={hidden} />
      <div className="flex justify-center w-full">
        { !hidden ? <Interface setHidden={setHidden} searching={searching} playerData={playerData} empty={empty} setEmpty={setEmpty}
                cards={cards} setCards={setCards} deck={deck} setDeck={setDeck} />
          : null}
      </div>
    </div>
	)
}