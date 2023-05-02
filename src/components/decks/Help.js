import React from 'react'

export default function Help() {
    const scrollHelp = () => {
		const element = document.getElementById('helpID');
		window.scrollTo({
			top:element.offsetTop,
			behavior:"smooth"
		});
	};
  return (
    <button className="py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-300 shadow-lg ring-1 ring-black/5 transition all duration-500 text-white font-bold"
			onClick={scrollHelp}>
        Help
    </button>
  )
}
