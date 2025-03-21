import React from 'react'

import Link from 'next/link'

function comsol() {
  return (
    <div className='flex flex-col items-center'>
        <ol className='w-3/4 list-decimal list-inside space-y-5'>
            <li className='tile'>
                <Link href='/fluids' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">3-Dimensional implementation of Jos Stam's Stable fluids</Link> and the <Link href='https://graphics.cs.cmu.edu/nsp/course/15-464/Spring11/papers/StamFluidforGames.pdf' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">original paper</Link> I based it on. The Next.js component I created for this website is on my <Link href='https://github.com/davidluby/next-portfolio/blob/main/src/components/simulations/ThreeFluid.js' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">Github</Link>.
            </li>
            <li className='tile'>
                I created <Link href='/comsol_fluid' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">another new page</Link> to show the 2-Dimensional fluid simulation I have been working on lately. My motivations for this were: it is not obvious what is going on in my 3D fluid simulation, and the resolution in 3D is poor due to browser capabilities. This will be turned into the background of my new portfolio. Click and drag across the screen to interact with the fluid. That file is called Sim_GL.js in the following <Link href='https://github.com/davidluby/next-portfolio/tree/main/src/components/simulations' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">respository</Link>.
            </li>
            <li className='tile'>
                My <Link href='/iterative' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">iterative methods page</Link> represents my exploration of the algorithms governing my fluid simulation. I have another <Link href='https://github.com/davidluby/python_scripts/tree/main/finite_element_analysis' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">Github repository</Link> where I uploaded some of my FEA work from school.
            </li>
            <li className='tile'>I deployed my Flask API on another free-tier AWS account. The Backend API button on my navigation bar works again, and so does the fullstack application I made. That Gihub respository is linked <Link href='https://github.com/davidluby/flask-portfolio' className='underline text-blue-500 hover:text-blue-400' target="_blank" rel="noopener noreferrer">here</Link>.</li>
        </ol>
    </div>
  )
}

export default comsol