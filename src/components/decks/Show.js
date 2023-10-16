import React, { useState } from 'react'

export default function Show({ status, setDataDecks, setEmpty, setReveal }) {

    const loadDecks = () => {
        fetch('/api/show_deck', {
            method: "GET",
        }
        ).then(
            response => response.json()
            .then(
                data => {
                    setDataDecks(data);
                    setEmpty(false);
                    setReveal(false);
                }
            )
        )
    }

  return (
    <div className="flex flex-col items-center mt-5">
        <button className="py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 transition all duration-500 text-white font-bold"
                onClick={loadDecks}>
            {status} Saved Decks
        </button>
    </div>
  )
}