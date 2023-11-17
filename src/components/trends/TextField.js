import React, { useState } from 'react'

function TextField({ data, setData, object, field }) {
	const [entry, setEntry] = useState(data[object][field]);
		
	let classes = "text-xs app:text-base z-50";
	if (object === 'y_series') {
		classes += ' absolute -rotate-90 -left-[5%]';
	} else if (object === 'yy_series') {
		classes += ' absolute rotate-90 -right-[5%]';
	} else if (field === 'title') {
		classes += ' w-full -mb-[5%]'
	} else {
		classes += ' w-full -mt-[3%]'
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
		<label htmlFor={field}>
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