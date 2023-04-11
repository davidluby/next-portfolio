import React from 'react'

export default function Edit({dataCards, setCards, dataDeck, setDeck, setHidden}) {
    const editDeck = () => {
        setCards(dataCards);
        setDeck(dataDeck);
        setHidden(false);
    };
  return (
    <button className="bg-green-700 hover:bg-green-600 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
        onClick={editDeck}>
        Edit Deck
    </button>
  )
}