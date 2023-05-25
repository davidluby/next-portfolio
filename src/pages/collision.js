import Head from 'next/head'
import Slides from '@components/nav/Slides'
import TwoCollisions from '@components/simulations/TwoCollisions'

export default function collision() {
    const names = [
        'Background', 'Algorithm'
    ]

    const pictures = [
        ['./collision/collision1.jpg', './collision/collision2.jpg'],
        ['./collision/collisionAlgo1.jpg', './collision/collisionAlgo2.jpg']

    ]

    return (
    <div className="flex flex-col items-center">
        <Head>
            <title>2D Collisions</title>
        </Head>
        <div className="flex items-center justify-center mb-20 -mt-5">
            <TwoCollisions name="twoCollisions" />
        </div>
        <Slides names={names} pictures={pictures} />
    </div>
      )
  }