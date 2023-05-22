import Head from 'next/head'
import Slides from '@components/nav/Slides'

export default function webgl() {
    const names = [
        'Matrix Algebra'
    ]

    const pictures = [
        [, './iterative/webgl1.jpg', './iterative/webgl2.jpg']

    ]

    return (
    <div className="flex flex-col items-center">
        <Head>
            <title>WebGL</title>
        </Head>
        <Slides names={names} pictures={pictures} />
    </div>
      )
  }