import Head from 'next/head'
import Slides from '@components/nav/Slides'

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
        <Slides names={names} pictures={pictures} />
    </div>
      )
  }