import React, { useState } from 'react'

export default function Show({ setDataDecks, setEmpty, setReveal }) {
    const [status, setStatus] = useState("Load")

    const Show = () => {
        fetch('/api/show_deck', {
            method: "GET",
        }
        ).then(
            response => response.json()
            .then(
                data => {
                    setDataDecks(JSON.parse(data));
                    setEmpty(false);
                    setReveal(false);
                    setStatus("Refresh")
                }
            )
        )
    }

  return (
    <div className="flex flex-col items-center mt-5">
        <button className="bg-green-700 hover:bg-green-600 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
                onClick={Show}>
            {status} Saved Decks
        </button>
    </div>
  )
}