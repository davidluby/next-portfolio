import React, { useState } from 'react'

// Editing display
import CurrentCard from './CurrentCard'
import CurrentDeck from './CurrentDeck'

// Editing controls
import Bias from './Bias'
import Add from './Add'
import New from './New'
import ExpandCards from './ExpandCards'
import Help from './Help'

// Storage controls
import Save from './Save'
import Show from './Show'

import StoredDecks from './StoredDecks'

export default function Interface({ cardData }) {

	// Deck being edited
	const [current, setCurrent] = useState({'id': 'null', 'saved': 'null', 'bias': 'null', 'cards': []});
	// Stored decks
	const [stored, setStored] = useState([]);

	// Show/hide editing
	const [empty, setEmpty] = useState(true);
	// Show/hide stored
	const [load, setLoad] = useState(true);

	return (
		<div className="flex flex-col items-center w-full">
			<div className="flex flex-col items-center w-[97%] res:w-5/6 p-5 app:p-12 mt-10 shadow-lg rounded-xl ring-1 ring-black/5 parquet">
				<h2 className="py-2 px-4 mb-5 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Click or tap to flip cards.</h2>
				<div className="flex flex-col app:flex-row app:justify-evenly items-center w-full">
					{ <div className="flex flex-col items-center" style={{animation : "inAnimation 500ms ease-in"}}>
						<CurrentCard cardData={cardData} loc="main" />
						</div>
					}
					{!empty ? <div className="flex flex-col items-center w-full app:w-[28rem]" style={{animation : "inAnimation 500ms ease-in"}}>
							<div className="flex flex-row justify-evenly w-full mt-5 app:mt-0 font-bold">
								<p className="py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Deck: {current.id}</p>
								<p className="py-2 px-4 rounded-md bg-yellow-500 shadow-lg ring-1 ring-black/5">Last saved: {current.saved}</p>
							</div>
						<CurrentDeck current={current} setCurrent={setCurrent} />
						</div> : null
					}
				</div>
				<Bias current={current} setCurrent={setCurrent} />
				<div className="flex flex-col app:flex-row items-center justify-center w-full mt-5 space-y-5 app:space-y-0 app:space-x-5">
					<Add cardData={cardData} current={current} setCurrent={setCurrent} setEmpty={setEmpty} />
					{!empty ? <New current={current} setCurrent={setCurrent} /> : null}
					{!empty ? <Save current={current} setStored={setStored} setLoad={setLoad} /> : null}
					{!empty ? <ExpandCards /> : null}
				</div>
				<div className="flex flex-col app:flex-row items-center justify-center w-full mt-5 space-y-5 app:space-y-0 app:space-x-5">
					<Show setStored={setStored} setLoad={setLoad} />
					<Help />
				</div>
			</div>
			{!load ? <StoredDecks stored={stored} setStored={setStored} setCurrent={setCurrent} setEmpty={setEmpty} /> : null}
		</div>
	)
}