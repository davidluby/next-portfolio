import React from 'react'

import Link from 'next/link'

function follow_up() {
  return (
    <div className='flex flex-col items-center'>
        <ol className='w-3/4 list-decimal list-inside space-y-5'>
            <li className='tile'>
                <Link href='/fluids' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">3-Dimensional implementation of Jos Stam&apos;s Stable fluids</Link> and the <Link href='https://graphics.cs.cmu.edu/nsp/course/15-464/Spring11/papers/StamFluidforGames.pdf' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">original paper</Link> I based it on. The Next.js component I created is on my <Link href='https://github.com/davidluby/next-portfolio/blob/main/src/components/simulations/ThreeFluid.js' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">Github</Link>.
            </li>
            <li className='tile space-y-3'>I created <Link href='/follow_up_fluid' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">another new page</Link> to show the 2-Dimensional fluid simulation I have been working on lately. Click and drag across the screen to interact with the fluid on that webpage. No mobile support as of yet.
                <p>My motivations for this were: it is not obvious what is going on in my 3D fluid simulation, the resolution in 3D is poor due to browser capabilities, and it is fun. This will be turned into the background of my new portfolio. That file is called Sim_GL.js in the following <Link href='https://github.com/davidluby/next-portfolio/tree/main/src/components/simulations' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">respository</Link>.</p>
            </li>
            <li className='tile'>
                My <Link href='/iterative' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">Iterative Methods page</Link> represents my exploration of some of the algorithms governing these fluid simulations. I have another <Link href='https://github.com/davidluby/python_scripts/tree/main/finite_element_analysis' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">Github repository</Link> where I uploaded some of my FEA work from school.
            </li>
            <li className='tile space-y-3'>I made another AWS free-tier account and deployed my Flask API to an EC2 instance one last time. The Backend API button on my navigation bar works again, and so does my <Link href='/decks' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">fullstack application</Link>. There is an MSSQL AWS RDS instance that communicates with the API. That Gihub respository is linked <Link href='https://github.com/davidluby/flask-portfolio' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">here</Link>.
                <p>I ran into some trouble with dependencies and SSL, among other things. Like we talked about, that debugging process is handled in the instance terminal using a log file, as is in the screenshot I took below.</p>
                <img className='w-9/10' src='./fullstack/errors.png'></img>
            </li>
        </ol>
    </div>
  )
}

export default follow_up