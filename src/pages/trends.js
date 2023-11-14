import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Figure from '@components/trends/Figure'

function Trends() {
	let figure_data = {
		id: '1',
		title: "Weight and Calories Against Time",
		x_label: "Day",
		y_label: "Weight",
		yy_label: "Calories",
		y_on: true,
		yy_on: true,
		x_range: [1, 31],
		y_range: [150, 200],
		yy_range: [1000, 3000],
		y_data: [190, 187, 188, 185, 188, 186, 185, 184, 185, 186, 183, 184, 184, 182, 179, 181, 179, 177, 182, 178, 178, 179, 177, 178, 176, 177, 175, 174, 173, 174, 172],
		yy_data: [2100, 2200, 1900, 2100, 1700, 1800, 1700, 1800, 1900, 1900, 1800, 1800, 1900, 1700, 1700, 1800, 1700, 1500, 1900, 2000, 1800, 1700, 1900, 1900, 1700, 1800, 1700, 1800, 1700, 2000, 1900],
	};
	
	let figure_data2 = {
		...figure_data,
		id : '2',
		title : "Bench Press and Calories Against Time"
	};
	
	let figure_data3 = {
		...figure_data,
		id : '3',
		title : "Body Weight and Calories Against Time"
	};
	const [data, setData] = useState({...figure_data3});

	const router = useRouter();

	useEffect(() => {
		document.querySelector('body').classList.add('bg-[#222222]');

		const exitingFunction = () => {
			document.querySelector('body').classList.remove('bg-[#222222]');
		};

		router.events.on("routeChangeStart", exitingFunction);

		return () => {
			router.events.off("routeChangeStart", exitingFunction);
		};
	});

	useEffect(() => {
		console.log(data)
	}, [data]);

	return (
		<div className="flex flex-col items-center w-full h-full text-white">
			<Figure data={data} setData={setData} />
		</div>
	)
}

export default trends