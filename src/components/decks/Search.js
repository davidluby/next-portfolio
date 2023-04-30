import React, { useState } from 'react'

export default function Search({ setPlayerData, setSearching, setHidden }) {
    const [name, setName] = useState("");
    const [active, setActive] = useState(false);
    const [placeholder, setPlaceholder] = useState("Search for a player")


    const handleSubmit = event => {
        setName(event.target.value);
    };
    
    const searchName = (event) => {
        if (event.key ===  "Enter") {
            fetch('/api/get_data', {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(name)
            }).then(
                response => response.json()
            .then(
                data => {
                    setPlayerData(JSON.parse(data.player_data));
                    setName("");
                    setSearching(false);
                    setHidden(false);
                    setActive(true);
                    setPlaceholder("Search disabled for one minute. Fill the deck with repeated cards and edit later.")
                    setTimeout(() => {
                        setActive(active => !active)
                        setPlaceholder("Search for a player")
                    }, 60000);
                }
            )
            )
        }
    }
    
    return (
        <div id="editID" className="flex flex-col items-center w-[97%] app:w-5/6 mt-20 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input className="w-full py-2 px-10 border-2 border-gray-300 shadow-md rounded-full transition all duration-500 hover:border-yellow-500 focus:outline-none focus:border-yellow-500"
                placeholder={placeholder}
                onChange={handleSubmit}
                value={name}
                onKeyPress={searchName}
                disabled={active}>
            </input>
        </div>
  
    )
}