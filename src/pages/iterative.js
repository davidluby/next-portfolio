import Head from 'next/head'
import Slides from '@components/nav/Slides'

export default function iterative() {
    const names = [
        'Background', 'Jacobi/Gauss-Seidel', 'Successive Overrelaxation', 'Algorithm'
    ]

    const pictures = [
        ['./iterative/iterative_bg.jpg'],
        ['./iterative/jg1.jpg', './iterative/jg2.jpg', './iterative/jg3.jpg'],
        ['./iterative/sor1.jpg', './iterative/sor2.jpg'],
        ['./iterative/iterative_algo.jpg']

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