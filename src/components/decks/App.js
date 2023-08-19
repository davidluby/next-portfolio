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
		<Search setPlayerData={setPlayerData} setSearching={setSearching} setHidden={setHidden} />
		<div className="flex justify-center w-full">
			{ !hidden ? <Interface setHidden={setHidden} searching={searching} playerData={playerData} empty={empty} setEmpty={setEmpty}
							cards={cards} setCards={setCards} deck={deck} setDeck={setDeck} />
				: <h1 className="w-[97rem] res:w-5/6 p-5 res:p-0 res:mt-20 text-center text-black"><b>Enter an <i>active</i> NBA player&apos;s name above. Try typing in &#34;Al Horford&#34; (remove quotes) if you need a name.</b></h1>}
		</div>
    </div>
	)
}