
export default function DecksEx() {


  return (
    <div className="flex flex-col items-center -mt-5 px-10">
		<div className="my-10 w-2/3">
    		<p>
        		The application interface deployed <a className="underline text-blue-700 hover:text-blue-400"
                href="https://main--davidluby.netlify.app/decks"
                target="_blank"
                rel="noopener noreferrer">here</a> is served via next.js, communicating with an API facilitated by Flask, mod_wsgi, and Apache hosted on an AWS EC2 instance. The API retrieves data directly from the internet and from an AWS MSSQL RDS instance, where data is also stored. Two testing endpoints are available <a className="underline text-blue-700 hover:text-blue-400"
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
                rel="noopener noreferrer">backend</a> repositories are public on GitHub. Below is a poorly-drawn block diagram used during development.
			</p>
			<img src="/system.png"></img>
			<ul className="ml-10 list-disc list-inside">
				<li>limited to one global search per minute to prevent performance issues on Sports Reference sites</li>
				<li className="ml-10">several limitations to resulting search algorithm</li>
				<li className="ml-20">the player must be active</li>
				<li className="ml-20">the name should be spelled perfectly</li>
				<li className="ml-20">players with suffixes rarely work</li>
				<li className="ml-10">I suggest editing an existing deck or adding the same player five times to avoid waiting 5+ minutes</li>
				<li>data, images, statistics, etc. from Sports Reference are blurred</li>
				<li>the database that stores card decks is cleared after the tenth deck submission</li>
			</ul>
		</div>
    </div>
	)
}