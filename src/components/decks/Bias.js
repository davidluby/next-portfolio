import React, { useState } from 'react'

	function Bias({ current, setCurrent }) {
		const [hide, setHide] = useState(true);

		function toggle() {
			setHide(!hide);
			const dropdown = document.getElementById('dropdown');
			dropdown.classList.toggle('h-10');
			dropdown.classList.toggle('h-40');
		};

		function pickTeam(selection) {
			toggle();
			const newDeck = {...current};
			newDeck.bias = selection;
			setCurrent(newDeck);

		};

		let teams = [
			'Bucks',
			'Bulls',
			'Cavaliers',
			'Celtics',
			'Clippers',
			'Grizzlies',
			'Hawks',
			'Heat',
			'Hornets',
			'Jazz',
			'Kings',
			'Knicks',
			'Lakers',
			'Magic',
			'Mavericks',
			'Nets',
			'Nuggets',
			'Pacers',
			'Pelicans',
			'Pistons',
			'Raptors',
			'Rockets',
			'Spurs',
			'Suns',
			'Thunder',
			'Timberwolves',
			'Trail Blazers',
			'Warriors',
			'Wizards',
			'76ers'
		]
	return (
		<div id="dropdown" className="flex flex-col w-3/4 app:w-2/5 h-10 mt-5 font-bold transition-all duration-500">
			<button className="flex flex-row space-x-2 p-2 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5" onClick={() => toggle()}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
				</svg>
				<div>
					{current.bias == null ? 'Select Favorite Team' : current.bias
					}
				</div>
			</button>
			<div className="flex flex-col w-full overflow-y-scroll">
				{!hide ? teams.map(function(team) {
					if (team == 'Bucks') {
						return <button key={team} className="w-full bg-yellow-500 border-b-2 rounded-t-md hover:bg-yellow-400" onClick={() => pickTeam(team)}>{team}</button>
					} else if (team == '76ers') {
						return <button key={team} className="w-full bg-yellow-500 border-b-2 rounded-b-md hover:bg-yellow-400" onClick={() => pickTeam(team)}>{team}</button>
					} else {
						return <button key={team} className="w-full bg-yellow-500 border-b-2 hover:bg-yellow-400" onClick={() => pickTeam(team)}>{team}</button>
					}
				}) : null}
			</div>
		</div>
	)
	}

	export default Bias