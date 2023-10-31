import React from 'react'

export default function Show({ setStored, setLoad }) {
    const get = {
        method: "GET",
    };

    const load_decks = () => {
        fetch('/api/show_deck', get)
        .then(response =>
            response.json()
        )
        .then(data => {
            setStored({...data});
            setLoad(false);
            }
        )
    };

  return (
    <div className="flex flex-col items-center">
        <button className="py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 transition all duration-500 text-white font-bold"
                onClick={load_decks}>
            Load Saved Decks
        </button>
    </div>
  )
}