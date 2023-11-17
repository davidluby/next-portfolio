import React, { useState } from 'react'

function TextField({ data, setData, object, field }) {
	const [entry, setEntry] = useState(data[object][field]);
		
	let classes = "border-2";
	if (object === 'y_series') {
		classes += ' -rotate-90 absolute -left-14 top-1/2';
	} else if (object === 'yy_series') {
		classes += ' rotate-90 absolute -right-14 top-1/2';
	} else {
		classes += ' w-full'
	}

	const handleSubmit = e => {
		if (e.key === 'Enter') {
			setData({
				...data,
				[object]: {
					...data[object],
					[e.target.name]: e.target.value
				}
			});
			e.preventDefault();
		};
	};

  return (
    <form className={classes}>
		<label htmlFor={field} className="w-full">
			<input className="w-full bg-transparent text-center hover:animate-pulse"
				name={field}
				value={entry}
				onChange={(e) => setEntry(e.target.value)}
				onKeyDown={handleSubmit}>
			</input>
		</label>
	</form>
  )
}

export default TextField