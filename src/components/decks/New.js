import React from 'react'

export default function New({ setDeck }) {
    const initialize = () => {
    	setDeck({'id': 'null', 'saved': 'null'});
    };
    
  return (
    <button className="bg-green-700 hover:bg-green-600 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
    	onClick={initialize}>
        Start New Deck
    </button>
	)
}