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
		<div id="scrollContainer h-2" className="sticky top-0">
			<div id="scrollBar" className="bg-yellow-500 h-1 w-0"></div>
		</div>
	)
}