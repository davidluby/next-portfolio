import React from 'react'

export default function New({ setDeck }) {
    const initialize = () => {
    	setDeck({'id': 'null', 'saved': 'null', 'bias': 'null'});
    };
    
  return (
    <button className="py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 transition all duration-500 text-white font-bold"
    	onClick={initialize}>
        Create New Deck
    </button>
	)
}