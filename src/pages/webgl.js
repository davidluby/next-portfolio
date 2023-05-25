import Head from 'next/head'
import Slides from '@components/nav/Slides'
import GL_triangle from '@components/simulations/GL_triangle'
import GL_box from '@components/simulations/GL_box'

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
        <div className="flex flex-col res:flex-row items-center justify-evenly w-[97%] res:w-5/6 mb-20">
            <GL_box name="GL_box"/>
            <GL_triangle name="GL_triangle" />
        </div>
        <Slides names={names} pictures={pictures} />
    </div>
      )
  }