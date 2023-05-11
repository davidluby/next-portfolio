import Head from 'next/head'

export default function fluids() {

    return (
        <div className="flex flex-col items-center mb-20">
            <Head>
                <title>Mechatronics</title>
            </Head>
            <div className="flex flex-col items-center w-[97%] space-y-5 res:w-1/2 tile bg-slate-900">
                <img src="mech/full-picture.jpg"></img>
                <img src="mech/diagram.png"></img>
                <img src="mech/block.jpg"></img>
                <img src="mech/arduino.jpg"></img>
            </div>
        </div>
      )
  }