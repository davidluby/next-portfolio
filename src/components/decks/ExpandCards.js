import React from 'react'

export default function ExpandCards() {
    const expand = () => {
        const stack = document.querySelector("#expand");
        stack.classList.toggle("-space-x-[21.5rem]");

    };
    
  return (
    <button className="bg-green-700 hover:bg-green-900 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => expand()}>
        Expand
    </button>
  )
}