import Head from 'next/head'
import Slides from '@components/nav/Slides'
import GL_triangle from '@components/simulations/GL_triangle'
import GL_box from '@components/simulations/GL_box'
import GL_mesh from '@src/components/simulations/GL_mesh'

export default function webgl() {
    const names = [
        'Matrix Algebra', 'Mesh Generation Algorithm'
    ]

    const pictures = [
        ['./webgl/webgl1.jpg', './webgl/webgl2.jpg'],
        ['./webgl/mesh1.jpg', './webgl/mesh2.jpg', './webgl/mesh3.jpg']

    ]

    return (
    <div className="flex flex-col items-center">
        <Head>
            <title>WebGL</title>
        </Head>
        <div className="flex flex-col res:flex-row items-center space-y-5 res:space-y-0 res:space-x-5 w-[97%] res:w-5/6 mb-20">
            <GL_mesh name="mesh" />
            <GL_box name="GL_box"/>
            <GL_triangle name="GL_triangle" />
        </div>
        <Slides names={names} pictures={pictures} />
    </div>
      )
  }