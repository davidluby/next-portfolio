import React, { useState } from 'react'

export default function Search({ setPlayerData, setSearching, setHidden }) {
    const [name, setName] = useState("");
    const [active, setActive] = useState(false);


    const handleSubmit = event => {
        setName(event.target.value);
    };
    
    const searchName = (event) => {
        if (event.key ===  "Enter") {
            fetch('https://davidluby.com/api/get_data', {
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
                    setTimeout(setActive(false), 10000);
                }
            )
            )
        }
    }

    return (
        <div className="flex flex-col items-center w-1/2 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input className="w-full py-2 px-10 border-2 border-gray-300 shadow-md rounded-full transition all duration-500 hover:border-yellow-500 focus:outline-none focus:border-yellow-500"
                placeholder="Search"
                onChange={handleSubmit}
                value={name}
                onKeyPress={searchName}
                disabled={active}>
            </input>
        </div>
  
    )
}