import React from 'react'

export default function Save({ current, setStored, setLoad }) {
    const post = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(current)
    };

    const put = {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(current)
    };

    const get = {
        method: 'GET'
    };

    async function saveDeck() {
        if (current.cards.length != 5 | current.bias == 'null') {
            alert("Each deck must have 5 cards and a favorite team.");

        } else {
            if (current.id == null) {
                await fetch('/api/create_deck', post);
            } else {
                await fetch('/api/update_deck', put);
            }

            fetch('/api/show_deck', get)
            .then(response => 
                response.json()
            )
            .then(data => {
                setStored({...data});
                setLoad(false);
                }
            )
        }
    };
    
  return (
    <button className="py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 transition all duration-500 text-white font-bold"
        onClick={() => saveDeck()}>
        Save Deck
    </button>
  )
}