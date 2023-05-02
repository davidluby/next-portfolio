import Head from 'next/head'
export default function collision() {


    return (
    <div className="flex flex-col items-center">
        <Head>
            <title>2D Collisions</title>
        </Head>
        <div className="flex flex-col items-center w-[97%] res:w-1/2 tile bg-slate-900">
            <img src="collision/c1.jpg"></img>
            <img src="collision/c2.jpg"></img>
            <img src="collision/c3.jpg"></img>
            <img src="collision/c4.jpg"></img>
        </div>
    </div>
      )
  }