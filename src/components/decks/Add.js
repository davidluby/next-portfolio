import React from 'react'

export default function Add({ cards, setCards, playerData, setHidden }) {
    const add = () => {
        if (cards.length < 5) {
            setCards([...cards, playerData]);
            setHidden(false);
        } else{
            console.log("Too many cards");
        }
    };
  return (
    <button className="w-max py-2 px-3 rounded-full bg-green-700 hover:bg-green-900 text-white font-bold transition all duration-500"
            onClick={add}>
        Add to Deck
    </button>
  )
}