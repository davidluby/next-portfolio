import React from 'react'

export default function Remove({ current, setCurrent, loc }) {
	const removeCard = () => {
		const newDeck = {...current};
		newDeck.cards.splice(loc, 1);
    	setCurrent(newDeck);
  	};

  return (
    <img className="absolute -right-3 -top-3 rounded-full w-6 h-6 hover:w-7 hover:h-7 transition-all duration-200 cursor-pointer"
		src="/fullstack/minus.jpg"
        onClick={removeCard}>
    </img>
 	)
}