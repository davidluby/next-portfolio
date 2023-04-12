
export default function DecksEx() {


  return (
    <div className="flex flex-col items-center px-10">
		<div className="w-5/6 px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
			<h1>
				How the B-Ball Cards application respects Sports Reference guidelines:
			</h1>
			<ul className="ml-10 list-disc list-inside">
				<li>it has never and will never be monetized</li>
				<li>search function globally limited to once per minute to prevent performance issues on Sports Reference sites</li>
				<li className="ml-10">this represents the only interaction with Sports Reference</li>
				<li>data, images, statistics, etc. from Sports Reference are blurred</li>
				<li>the database that stores card information is cleared after the tenth deck submission</li>
			</ul>
		</div>
		<div className="my-10 w-5/6 px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
			<h1>
				How B-Ball Cards application application works:
			</h1>
    		<p>
        		The application interface <a className="underline text-blue-700 hover:text-blue-400"
                href="https://main--davidluby.netlify.app/decks"
                target="_blank"
                rel="noopener noreferrer">here</a> uses next.js and is deployed on Netlify, communicating with an API served by Flask, mod_wsgi, and Apache deployed on an AWS EC2 instance. The API retrieves data directly from the internet and from an AWS MSSQL RDS instance, where data is also stored. Two testing endpoints are available <a className="underline text-blue-700 hover:text-blue-400"
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
			<img src="/system.png"></img>
			<p>
				I regret that this website&#8212;in particular, this application&#8212;is not very responsive (4/12/2023), but I feel it is enough to post during a job search. Once again, if you see anything broken or poorly-done, challenge me to fix it!
			</p>
		</div>
    </div>
	)
}