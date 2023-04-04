import React from 'react'

export default function New({ setDeck }) {
    const initialize = () => {
      setDeck({'id': 'null', 'saved': 'null', 'bias': 'null'});
    };
    
  return (
    <button className="bg-green-700 hover:bg-green-900 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
        onClick={initialize}>
        New Deck
    </button>
  )
}