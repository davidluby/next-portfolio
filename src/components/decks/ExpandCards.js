import React, { useState } from 'react'

export default function ExpandCards() {
	const [text, setText] = useState("Stack Deck")
    const expand = () => {
		const stack = document.querySelector("#expand");
		stack.classList.toggle("-space-x-72");
		stack.classList.toggle("-space-x-[20rem]");
		stack.classList.toggle("app:-space-x-[21.5rem]");

		if (text == "Stack Deck"){
			setText("Spread Deck")
		}
		else {
			setText("Stack Deck")
		}
    };

  return (
	<button className="py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 transition all duration-500 text-white font-bold"
		onClick={() => expand()}>
		{text}
	</button>
  )
}