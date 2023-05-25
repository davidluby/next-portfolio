import Head from 'next/head'
import TwoFluid from '@components/simulations/TwoFluid'
import GL_canvas from '@components/simulations/GL_canvas'
import Slides from '@components/nav/Slides'

export default function fluids() {
    const names = [
        'Navier-Stokes', 'Algorithm'
    ]

    const pictures = [
        ['./fluids/fluid1.jpg', './fluids/fluid2.jpg', './fluids/fluid3.jpg', './fluids/fluid4.jpg'],
        ['./fluids/fluidAlgo1.jpg', './fluids/fluidAlgo2.jpg', './fluids/fluidAlgo3.jpg', './fluids/fluidAlgo4.jpg', './fluids/fluidAlgo5.jpg']

    ]

    return (
    <div className="flex flex-col items-center">
        <Head>
            <title>Fluid Simulation</title>
        </Head>
        <div className="flex flex-col res:flex-row items-center justify-evenly mb-5 -mt-5">
            <div className="flex items-center justify-center w-full res:w-1/2 mb-5 res:mb-0">
                <TwoFluid name="twoFluid" />
            </div>
            <GL_canvas name="glCanvas" />
        </div>
        <Slides names={names} pictures={pictures} />
    </div>
      )
  }