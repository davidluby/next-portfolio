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
    <button className="bg-green-700 hover:bg-green-600 transition all duration-500 text-white font-bold py-2 px-4 rounded-full"
			onClick={scrollHelp}>
        Help
    </button>
  )
}
