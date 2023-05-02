import React from 'react'

export default function Delete({ dataDeck, setDataDecks }) {
    const deleteDeck = () => {
    	fetch('/api/delete_deck', {
    		method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(dataDeck)
      	})
		fetch('/api/show_deck', {
			method: "GET",
		}
		)
    }
	return (
		<button className="py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 transition all duration-500 text-white font-bold "
		onClick={deleteDeck}>
			Delete Deck
		</button>
	)
}