import React, { useState } from 'react'

function tinker() {
    const [entries, setEntries] = useState([]);

    function handleSubmit(e) {
        if (e.key === "Enter") {
            setEntries(...entries, setEntries);
            console.log(entries);
        }
    }

  return (
    <div className="border-4 border-red-500 flex flex-col items-center">
        <input className="border-2 border-yellow-300 rounded-full shadow-xl w-2/3 pl-8 py-2 text-lg text-black focus:outline-none"
            placeholder="Enter field"
            onKeyPress={handleSubmit}
            >
        </input>
        <div>
            
        </div>
    </div>
  )
}

export default tinker