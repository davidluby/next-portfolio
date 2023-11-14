import React, { useState } from 'react'

function InputField({ data, setData, field }) {
	const [entry, setEntry] = useState(data[field]);

	const handleSubmit = e => {
		if (e.key === 'Enter') {
			setData({
				...data,
				[e.target.name]: e.target.value
			});
			e.preventDefault();
		};
	};

  return (
    <form>
		<label htmlFor={field}>
			<input className="placeholder-white bg-transparent text-center hover:animate-pulse"
				name={field}
				value={entry}
				onChange={(e) => setEntry(e.target.value)}
				onKeyDown={handleSubmit}>
			</input>
		</label>
	</form>
  )
}

export default InputField