import React, { useState } from 'react'

export default function ExpandCards() {
	const [text, setText] = useState("Collapse Deck")
    const expand = () => {
		const stack = document.querySelector("#expand");
		stack.classList.toggle("-space-x-72");
		stack.classList.toggle("-space-x-[21.5rem]");
		setText("Fan")

    };
    

  return (
	<button className="bg-green-700 hover:bg-green-600 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
		onClick={() => expand()}>
		{text} Deck
	</button>
  )
}