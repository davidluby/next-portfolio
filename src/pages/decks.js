import Head from 'next/head'
import Link from "next/link"
import App from "@components/decks/App"
            
export default function Decks() {


  return (
    <div className="flex flex-col items-center mb-20">
		<Head>
			<title>Fullstack App</title>
		</Head>
		<App />
		<div className="w-[97%] res:w-5/6 tile bg-slate-900">
			<h1>
				How the B-Ball Cards application respects Sports Reference guidelines:
			</h1>
			<ul className="list-disc list-inside">
				<li>it has never and will never be monetized or advertised commercially (no SEO)</li>
				<li>search function is limited to once per minute to prevent adverse performance impacts on Sports Reference sites</li>
				<li className="ml-10">this represents the only direct interaction with Sports Reference websites</li>
				<li>data, images, statistics, etc. presented on this site from Sports Reference are blurred such that the data is not used in a manner that competes with Sports Reference&#x27;s services</li>
				<li>the database that stores deck data is cleared after the 20<sup>th</sup> deck submission such that the data is not used in a manner that competes with Sports Reference&#x27;s services</li>
			</ul>
		</div>
		<div className="w-[97%] res:w-5/6 mt-20 tile bg-slate-900">
			<h1>
				How the B-Ball Cards application application works:
			</h1>
			
    		<p>
        		The appilcation&apos;s frontend is built on next.js and deployed via Netlify, communicating with an Apache web server, WSGI, and Flask API deployed on an Amazon Linux 2 instance. The API retrieves data directly from the internet and from an AWS MSSQL RDS instance, where data is also stored. Two testing endpoints are available&nbsp;
				<Link className="underline text-blue-500 hover:text-blue-400" href="https://davidluby.com/plain_test" target="_blank" rel="noopener noreferrer">here</Link> and&nbsp;
				<Link className="underline text-blue-500 hover:text-blue-400" href="https://davidluby.com/rest_test" target="_blank" rel="noopener noreferrer">here</Link>, and the&nbsp;
				<Link className="underline text-blue-500 hover:text-blue-400" href="https://github.com/davidluby/next-portfolio" target="_blank" rel="noopener noreferrer">frontend</Link> and&nbsp;
				<Link className="underline text-blue-500 hover:text-blue-400" href="https://github.com/davidluby/flask-portfolio" target="_blank" rel="noopener noreferrer">backend</Link> repositories are public on GitHub. Below are a number of diagrams drawn before any of the application materialized. Their description of the app architecture is still mostly valid.
			</p>
			<p className="mt-4">
				The backend repository uses Git, GitHub, AWS CodePipeline, and AWS CodeDeploy for CI/CD deployment to an Amazon Linux 2 instance. Similarly, the frontend uses Git and GitHub for direct CI/CD integration with Netlify.
			</p>
			<p className="mt-4">
				I regret that this website&#8212;in particular, this application&#8212;is not very responsive (4/13/2023), but I feel it demonstrates fullstack competency and is enough to post. If you see anything broken or poorly-done, I probably know about it, so challenge me to correct it! <b>And, yes, this is wildly overengineered for my purposes, but it was a great learning experience.</b>
			</p>
		</div>
		<div className="w-[97%] res:w-1/2 mt-20 tile bg-slate-900">
			<img className="mt-10" src="./fullstack/system.png"></img>
			<img className="mt-10" src="./fullstack/fs1.jpg"></img>
			<img className="mt-10" src="./fullstack/fs2.jpg"></img>
			<img className="mt-10" src="./fullstack/fs3.jpg"></img>
		</div>
		<div id="helpID" className="w-[97%] res:w-5/6 mt-20 tile bg-slate-900">
			<h1>
				Quick Start
			</h1>
			<p>
				The above application is intended to demonstrate fullstack competency. Please visit the&nbsp;
				<Link className="underline text-blue-500 hover:text-blue-400" href="/decks_ex" target="_blank" rel="noopener noreferrer">explanation</Link>
				&nbsp;page for a description of what is going on behind the scenes.
			</p>
			<p className="mt-4">
				<b>Click on the search bar and type in an NBA player&#x27;s name.</b> Limitations to the search algorithm have the following consequences:
			</p>
			<ul className="list-disc list-inside res:ml-10">
				<li>only one search is allowed each minute (fill decks with repeated cards, or edit an existing deck)</li>
				<li>the player must still be playing in the NBA</li>
				<li>names typed into the search bar should be spelled perfectly</li>
				<li>players with prefixes, suffixes, or hyphens&#8212;anything other than a first and last name&#8212;rarely work</li>
				<li>players traded this season will appear with a blank background and some incorrect data</li>
				<li>player data is blurred</li>
			</ul>
			<p className="mt-4">
				Finally, <b>this works well in Chromium browsers (Chrome, Edge, FireFox, etc.)</b>, it does not in Safari, and no others were checked. Mobile is also a little broken.
			</p>
			<h1 className="mt-4">
				Disclaimer
			</h1>
			<p>
				<i>
					All player pictures, statistics, and data are property of&nbsp;
					<Link className="underline text-blue-500 hover:text-blue-400" href="https://www.basketball-reference.com" target="_blank" rel="noopener noreferrer">www.basketball-reference.com</Link>
					. This demonstration is intentionally limited to better align with the&nbsp;
					<Link className="underline text-blue-500 hover:text-blue-400" href="https://www.sports-reference.com/data_use.html" target="_blank" rel="noopener noreferrer">guidelines</Link>
					&nbsp;issued by Sports Reference. Measures taken to limit this site&#x27;s footprint on Sports References&#x27; are described on the&nbsp;
					<Link className="underline text-blue-500 hover:text-blue-400" href="/decks_ex" target="_blank" rel="noopener noreferrer">explanation</Link>
					&nbsp;page.<b> Data, images, statistics, etc. from Sports Reference are blurred.</b>
				</i>
      		</p>
		</div>
    </div>
	)
}