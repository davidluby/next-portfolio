import React, { useState } from 'react'

function TextField({ data, setData, object, field }) {
	const [entry, setEntry] = useState(data[object][field]);

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
    <form className="w-full border-2 border-yellow-500">
		<input className="w-full bg-transparent hover:animate-pulse border-2 border-blue-500"
			name={field}
			value={entry}
			onChange={(e) => setEntry(e.target.value)}
			onKeyDown={handleSubmit}>
		</input>
	</form>
  )
}

export default TextField