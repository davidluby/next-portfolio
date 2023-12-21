import React, { useState } from 'react'
import Search from "@components/decks/Search"
import Interface from "@components/decks/Interface"


export default function App() {
	const [cardData, setCardData] = useState("");
	// Hide/show interface
	const [hidden, setHidden] = useState(true);

  return (
	<div className="flex flex-col items-center mb-10 w-full text-white z-10">
		<Search setCardData={setCardData} setHidden={setHidden} hidden={hidden} />
		<div className="flex justify-center w-full">
			{!hidden ? <Interface cardData={cardData} /> : null}
		</div>
	</div>
	)
}