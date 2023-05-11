import Head from 'next/head'
            
export default function DecksEx() {


  return (
    <div className="flex flex-col items-center mb-20">
		<Head>
			<title>Fullstack App</title>
		</Head>
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
        		The <a className="underline text-blue-700 hover:text-blue-400"
                href="https://main--davidluby.netlify.app/decks"
                target="_blank"
                rel="noopener noreferrer">appilcation&apos;s frontend</a> is built on next.js and deployed via Netlify, communicating with an API using an Apache web server deployed on an AWS EC2 instance backed by a Flask WSGI. The API retrieves data directly from the internet and from an AWS MSSQL RDS instance, where data is also stored. Two testing endpoints are available <a className="underline text-blue-700 hover:text-blue-400"
                href="https://davidluby.com/plain_test"
                target="_blank"
                rel="noopener noreferrer">here</a> and <a className="underline text-blue-700 hover:text-blue-400"
                href="https://davidluby.com/rest_test"
                target="_blank"
                rel="noopener noreferrer">here</a>, and the <a className="underline text-blue-700 hover:text-blue-400"
                href="https://github.com/davidluby/next-portfolio"
                target="_blank"
                rel="noopener noreferrer">frontend</a> and <a className="underline text-blue-700 hover:text-blue-400"
                href="https://github.com/davidluby/flask-portfolio"
                target="_blank"
                rel="noopener noreferrer">backend</a> repositories are public on GitHub. Below are a number of diagrams drawn before any of the application materialized. Their description of the app architecture is still mostly valid.
			</p>
			<p className="mt-4">
				The backend repository uses Git, GitHub, AWS CodePipeline, and AWS CodeDeploy for CI/CD deployment to an Amazon Linux 2 instance. Similarly, the frontend uses Git and GitHub for direct CI/CD integration with Netlify.
			</p>
			<p className="mt-4">
				I regret that this website&#8212;in particular, this application&#8212;is not very responsive (4/13/2023), but I feel it demonstrates fullstack competency and is enough to post. If you see anything broken or poorly-done, I probably know about it, so challenge me to correct it! <b>And, yes, this is wildly overengineered for my purposes, but it was a great learning experience.</b>
			</p>
			<img className="mt-10" src="./fullstack/system.png"></img>
			<img className="mt-10" src="./fullstack/fs1.jpg"></img>
			<img className="mt-10" src="./fullstack/fs2.jpg"></img>
			<img className="mt-10" src="./fullstack/fs3.jpg"></img>
		</div>
    </div>
	)
}