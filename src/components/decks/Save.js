import React from 'react'

export default function Save({cards, deck, setDataDecks, setEmpty, setReveal }) {
    const saveData = () => {
        if (cards.length != 5) {
            alert("Each deck submission must have five cards.")
        }
        else {
            cards.unshift(deck)
            fetch('/api/intake_deck', {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(cards)
                }
            )
            cards.shift()

            fetch('/api/show_deck', {
                method: "GET",
                }).then(
                response => response.json()
                .then(
                    data => {
                        setDataDecks(JSON.parse(data));
                        setEmpty(false);
                        setReveal(false);
                    }
                )
            )
        }
    }
    
  return (
    <button className="bg-green-700 hover:bg-green-600 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
        onClick={saveData}>
        Save Deck
    </button>
  )
}