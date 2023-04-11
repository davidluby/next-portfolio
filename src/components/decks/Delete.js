import React from 'react'

export default function Delete({ dataDeck }) {
    const deleteDeck = () => {
    	fetch('/api/delete_deck', {
    		method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(dataDeck)
      	})
    }
  return (
    <button className="bg-green-700 hover:bg-green-600 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
    onClick={deleteDeck}>
        Delete Deck
    </button>
  )
}