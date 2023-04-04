import React from 'react'

export default function Remove({ cards, setCards, loc }) {
  const removeCard = () => {
    cards.splice(loc, 1)
    setCards([...cards]);
  };

  return (
    <img className="absolute -right-3 -top-3 rounded-full w-6 h-6 hover:w-7 hover:h-7 transition-all duration-200 cursor-pointer"
		src="minus.jpg"
        onClick={removeCard}>
    </img>
  )
}