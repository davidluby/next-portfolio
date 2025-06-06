import React, { useState } from 'react'

export default function Search({ setCardData, hidden, setHidden }) {
    const [name, setName] = useState("");
    const [cooldown, setCooldown] = useState(false);
    const [placeholder, setPlaceholder] = useState("Search for a player");

    const handleSubmit = event => {
        setName(event.target.value);
    };
    
    const post = {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(name)
    };

    const searchName = (event) => {
        if (event.key ===  "Enter") {
            fetch('/api/get_data', post)
            .then(response => {
                if(response.status >= 400) {
                    alert("Error. Please see the Quick Start section for a list of known issues.")
                }
                return response.json()
                }
            )
            .then(data => {
                setCardData(data.player_data);
                setName("");
                setHidden(false);
                /* setCooldown(true);
                setPlaceholder("One minute cooldown. Fill the deck with duplicates.")
                setTimeout(() => {
                    setCooldown(cooldown => !cooldown)
                    setPlaceholder("Search for a player" )
                }, 60000); */
                }
            )
        }
    }
    
    return (
        <div className="flex flex-col items-center w-[97%] res:w-5/6 parquet tile">
            <div id="editID" className="flex flex-col items-center w-[97%] res:w-5/6 relative text-black">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input className="w-full py-2 px-10 border-2 border-gray-300 shadow-md rounded-full transition all duration-500 hover:border-yellow-500 focus:outline-none focus:border-yellow-500 bg-white"
                    placeholder={placeholder}
                    onChange={handleSubmit}
                    value={name}
                    onKeyDown={searchName}
                    disabled={cooldown}>
                </input>
            </div>
            {!hidden ? <h2 className="w-[97%] res:w-5/6 text-center mt-5 py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">
                    <b>Add the card to a deck below. You can fill your deck with duplicates or wait a minute to search again. Save, view, and edit your deck below.</b>
                </h2> : <h2 className="w-[97%] res:w-5/6 text-center mt-5 py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">
                    <b>Enter an <i>active</i> NBA player&apos;s name above. Try typing in &#34;Al Horford&#34; (remove quotes) if you need a name.</b>
                </h2>
            }
        </div>
  
    )
}