import React from 'react'

export default function Delete({ id, setStored }) {
	const del = {
		method: "DELETE",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify(id)
	};

	const get = {
		method: "GET",
	};

	async function deleteDeck() {
		await fetch('/api/delete_deck', del);

		fetch('/api/show_deck', get)
		.then(response => 
			response.json()
		)
		.then(data => {
			setStored({...data})
			}
		)
	};

	return (
		<button className="py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 transition all duration-500 text-white font-bold "
		onClick={() => deleteDeck()}>
			Delete Deck
		</button>
	)
}