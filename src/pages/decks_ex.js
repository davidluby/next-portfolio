
export default function DecksEx() {


  return (
    <div className="flex flex-col items-center px-10">
		<div className="w-5/6 px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
			<h1>
				How the B-Ball Cards application respects Sports Reference guidelines:
			</h1>
			<ul className="ml-10 list-disc list-inside">
				<li>it has never and will never be monetized or advertised commercially (no SEO)</li>
				<li>search function is limited to once per minute to prevent adverse performance impacts on Sports Reference sites</li>
				<li className="ml-10">this represents the only direct interaction with Sports Reference websites</li>
				<li>data, images, statistics, etc. presented on this site from Sports Reference are blurred such that the data is not used in a manner that competes with Sports Reference&#x27;s services</li>
				<li>the database that stores deck data is cleared after the 20<sup>th</sup> deck submission such that the data is not used in a manner that competes with Sports Reference&#x27;s services</li>
			</ul>
		</div>
		<div className="my-10 w-5/6 px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
			<h1>
				How the B-Ball Cards application application works:
			</h1>
    		<p>
        		The <a className="underline text-blue-700 hover:text-blue-400"
                href="https://main--davidluby.netlify.app/decks"
                target="_blank"
                rel="noopener noreferrer">appilcation frontend</a> is built on next.js and deployed on Netlify, communicating with an API via an Apache web server deployed on an AWS EC2 instance backed by a WSGI Flask application. The API retrieves data directly from the internet and from an AWS MSSQL RDS instance, where data is also stored. Two testing endpoints are available <a className="underline text-blue-700 hover:text-blue-400"
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
                rel="noopener noreferrer">backend</a> repositories are public on GitHub. Below is a block diagram drawn before any of the application materialized. It is still valid.
			</p>
			<p className="mt-4">
				The backend repository uses Git, GitHub, AWS CodePipeline, and AWS CodeDeploy for CI/CD deployment to the Amazon Linux 2 instance where this is hosted. Similarly, the frontend uses Git and GitHub to deploy directly to Netlify.
			</p>
			<p className="mt-4">
				I regret that this website&#8212;in particular, this application&#8212;is not very responsive (4/13/2023), but I feel it demonstrates fullstack competency and is enough to post. If you see anything broken or poorly-done, I probably know about it, so challenge me to fix it! <b>And, yes, this is wildly overengineered for my purposes, but it was a great learning experience.</b>
			</p>
			<img className="mt-10" src="/system.png"></img>
		</div>
    </div>
	)
}