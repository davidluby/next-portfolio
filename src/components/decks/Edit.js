import React from 'react'

export default function Edit({dataCards, setCards, dataDeck, setDeck, setHidden}) {
	const editDeck = () => {
		setCards(dataCards);
		setDeck(dataDeck);
		setHidden(false);
		const element = document.getElementById('editID');
		window.scrollTo({
			top:element.offsetTop,
			behavior:"smooth"
		});
	};
	return (
		<button className="py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 transition all duration-500 text-white font-bold"
			onClick={editDeck}>
			Edit Deck
		</button>
  )
}