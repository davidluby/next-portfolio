import React, { useState, useEffect } from 'react'

export default function Add({ playerData, cards, setCards, setEmpty }) {
    const [full, setFull] = useState(false);
    const [text, setText] = useState("Add Card to Deck");

    const add = () => {
        if (cards.length < 5) {
            setCards([...cards, playerData]);
            setEmpty(false);
        };
    };

    useEffect(() => {
        if (cards.length < 5) {
            setText("Add Card to Deck");
            setFull(false);
        } else{
            setText("Five Card Max");
            setFull(true);
        };
    }, [cards])

  return (
    <button className="w-max py-2 px-3 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 text-white font-bold transition all duration-500"
            onClick={add}
            disabled={full}>
        {text}
    </button>
  )
}