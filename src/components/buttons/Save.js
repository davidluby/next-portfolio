import React from 'react'

export default function Save({cards, deck}) {
    const saveData = () => {
        if (cards.length != 5) {
            alert("Each deck submission must have five cards.")
        }
        else {
            cards.unshift(deck)
            fetch('https://davidluby.com/api/intake_deck', {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(cards)
                }
            )
            cards.shift()
        }
    }
    
  return (
    <button className="bg-green-700 hover:bg-green-900 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
        onClick={saveData}>
        Save Deck
    </button>
  )
}