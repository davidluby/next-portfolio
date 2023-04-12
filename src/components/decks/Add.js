import React, { useState } from 'react'

export default function Add({ playerData, cards, setCards, setEmpty }) {
    const [text, setText] = useState("Add Card to Deck")
    const add = () => {
        if (cards.length < 4) {
            setText("Add Card to Deck")
            setCards([...cards, playerData]);
            setEmpty(false);
        } else{
            setText("Max Five Cards")
        }
    };
  return (
    <button className="w-max py-2 px-3 rounded-full bg-green-700 hover:bg-green-600 text-white font-bold transition all duration-500"
            onClick={add}>
        {text}
    </button>
  )
}