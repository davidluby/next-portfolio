import React from 'react'

export default function Add({ playerData, cards, setCards, setEmpty }) {
    const add = () => {
        if (cards.length < 5) {
            setCards([...cards, playerData]);
            setEmpty(false);
        } else{
            console.log("Too many cards");
        }
    };
  return (
    <button className="w-max py-2 px-3 rounded-full bg-700 hover:bg-green-600 text-white font-bold transition all duration-500"
            onClick={add}>
        Add card to Deck
    </button>
  )
}