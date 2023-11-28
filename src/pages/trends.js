import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Figure from '@components/trends/Figure'
import TextField from '@components/trends/TextField'
import Checkbox from '@components/trends/Checkbox'

function Trends() {

	const router = useRouter();

	useEffect(() => {
		document.querySelector('body').classList.add('bg-[#222222]');
		document.querySelector('nav').classList.remove('mb-10');

		const exitingFunction = () => {
			document.querySelector('body').classList.remove('bg-[#222222]');
			document.querySelector('nav').classList.add('mb-10');
		};

		router.events.on("routeChangeStart", exitingFunction);

		return () => {
			router.events.off("routeChangeStart", exitingFunction);
		};
	});


	const white = 'rgb(0, 0, 0)';
	const gray = 'rgb(34, 34, 34)';
	const blue = 'rgb(58, 107, 186)';
	const purple = 'rgb(149, 102, 192)';
	const pink = 'rgb(218, 91, 171)';
	const salmon = 'rgb(255, 92, 130)';
	const orange = 'rgb(255, 122, 78)';
	const gold = 'rgb(255, 166, 0)';

	const [data, setData] = useState({
		id: '1',

		base: {
			background: gray,
			title_on: true,
			y_on: true,
			yy_on: true,
			x_on: true,

			title: "Weight and Calories Against Time",
			label: "Day",

			x_range: [1, 31],

		},

		y_series: {
			show_data: true,
			show_ticks: true,
			show_label: true,
			show_tick_labels: true,
			show_ls: true,
			dashed: true,
			label: "Body Weight (lbs)",
			data_color: orange,
			ls_color: purple,
			range: [150, 200],
			data: [190, 187, 188, 185, 188, 186, 185, 184, 185, 186, 183, 184, 184, 182, 179, 181, 179, 177, 182, 178, 178, 179, 177, 178, 176, 177, 175, 174, 173, 174, 172], 
		},
		yy_series:{
			show_data: true,
			show_ticks: true,
			show_label: true,
			show_tick_labels: true,
			show_ls: true,
			dashed: true,
			label: "Calories (kCal)",
			data_color: blue,
			ls_color: gold,
			range: [1000, 3000],
			data: [2100, 2200, 1900, 2100, 1700, 1800, 1700, 1800, 1900, 1900, 1800, 1800, 1900, 1700, 1700, 1800, 1700, 1500, 1800, 1700, 1600, 1700, 1700, 1800, 1700, 1800, 1700, 1800, 1700, 1500, 1400],
		},
	});

	useEffect(() => {
		console.log(data)
	}, [data]);

	return (
		<div className="flex flex-col items-center w-full text-white">
			<Figure data={data} setData={setData} />
			<div className="flex flex-row justify-evenly w-full border-2">
				<div className="flex flex-col w-1/4 border-2 border-green-500">
					<TextField data={data} setData={setData} object='base' field='title' />
					<TextField data={data} setData={setData} object='base' field='label' />
					<Checkbox data={data} setData={setData} object='base' field='title_on'/>
					<Checkbox data={data} setData={setData} object='base' field='x_on'/>
					<Checkbox data={data} setData={setData} object='base' field='y_on'/>
					<Checkbox data={data} setData={setData} object='base' field='yy_on'/>
				</div>
				<div className="flex flex-col w-1/4 border-2 border-green-500">
					<TextField data={data} setData={setData} object='y_series' field='label' />
					<Checkbox data={data} setData={setData} object='y_series' field='show_data'/>
					<Checkbox data={data} setData={setData} object='y_series' field='show_ticks'/>
					<Checkbox data={data} setData={setData} object='y_series' field='show_label'/>
					<Checkbox data={data} setData={setData} object='y_series' field='show_tick_labels'/>
					<Checkbox data={data} setData={setData} object='y_series' field='show_ls'/>
				</div>
				<div className="flex flex-col w-1/4 border-2 border-green-500">
					<TextField data={data} setData={setData} object='yy_series' field='label' />
					<Checkbox data={data} setData={setData} object='yy_series' field='show_data'/>
					<Checkbox data={data} setData={setData} object='yy_series' field='show_ticks'/>
					<Checkbox data={data} setData={setData} object='yy_series' field='show_label'/>
					<Checkbox data={data} setData={setData} object='yy_series' field='show_tick_labels'/>
					<Checkbox data={data} setData={setData} object='yy_series' field='show_ls'/>
					
				</div>
			</div>
		</div>
	)
}

export default Trends