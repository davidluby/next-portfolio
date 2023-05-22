import Head from 'next/head'
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
        <Slides names={names} pictures={pictures} />
    </div>
      )
  }