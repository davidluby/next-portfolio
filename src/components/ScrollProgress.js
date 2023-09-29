import React, { useEffect } from 'react'


export default function ScrollProgress() {
	function scrollBar() {
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  		var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  		var scrolled = (winScroll / height) * 100;
		document.getElementById("scrollBar").style.width = scrolled + '%';
	}

	useEffect(() => {
		window.onscroll = scrollBar;
	}, [])
  	return (
		<div id="scrollContainer" className="sticky top-11 border-0 -mt-28 mb-28">
			<div id="scrollBar" className="bg-yellow-500 h-[.35rem] w-0 z-100"></div>
		</div>
	)
}