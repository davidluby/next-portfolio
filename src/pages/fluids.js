import Head from 'next/head'
import TwoFluid from '@components/simulations/TwoFluid'
import Slides from '@components/nav/Slides'

export default function fluids() {
    const names = [
        'Navier-Stokes', 'Algorithm', 'Mesh Generation Algorithm'
    ]

    const pictures = [
        ['./fluids/fluid1.jpg', './fluids/fluid2.jpg', './fluids/fluid3.jpg', './fluids/fluid4.jpg'],
        ['./fluids/fluidAlgo1.jpg', './fluids/fluidAlgo2.jpg', './fluids/fluidAlgo3.jpg', './fluids/fluidAlgo4.jpg', './fluids/fluidAlgo5.jpg'],
        ['./webgl/mesh1.jpg', './webgl/mesh2.jpg', './webgl/mesh3.jpg']

    ]

    return (
    <div className="flex flex-col items-center">
        <Head>
            <title>Fluid Simulation</title>
        </Head>
        <div className="w-[97%] res:w-1/2 mb-5 res:mb-10">
            <TwoFluid name="twoFluid" />
        </div>
        <Slides names={names} pictures={pictures} />
    </div>
      )
  }