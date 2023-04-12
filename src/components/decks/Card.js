import React from 'react'
import Overall from "@components/decks/Overall"

export default function Card({ data, loc }) {
    const offenseRTG = ((data.ppg/28)*0.6 + (data.reb/9)*0.1 + (data.ast/9)*0.3);
    const defenseRTG = ((data.reb/13)*0.05 + (data.stl/1.2)*0.475 + (data.blk/1)*0.475);
    const overallRTG = ((data.min/40)*0.2 + +offenseRTG*0.6 + defenseRTG*0.2);

    function flipCard() {
        const id = '#flipState-'+loc
        const flip = document.querySelector(id)
        flip.classList.toggle("[transform:rotateY(180deg)]")
    }
  return (
    <button className="group text-left card-size transition-all ease-in duration-500 [perspective:1000px]">
        <div className="relative h-full w-full transition-all ease-in duration-500 [transform-style:preserve-3d]"
            id={"flipState-"+loc}
            onClick={() => flipCard()}>
            <div className="absolute h-full w-full rounded-xl shadow-sm shadow-black/80 bg-center bg-cover bg-no-repeat"
                style={{backgroundImage: `url(${"./cities/" + data.team.toLowerCase() + ".jpg"})`}}>
            </div>
            <div className="absolute overflow-hidden h-full w-full rounded-xl border-4 border-yellow-500 group-hover:border-yellow-300 transition-all duration-500 [backface-visibility:hidden]">
                <div className="absolute w-[32rem] top-52 rotate-90 pl-12 text-xl font-bold italic text-white bg-yellow-500 group-hover:bg-yellow-300 transition-all duration-500">
                    {data.team} - {data.name}
                </div>
            </div>

            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                id="flipState">
                <div className="flex flex-col items-center justify-evenly h-full w-full rounded-xl bg-black/60 text-white">
                    <div className="flex flex-row space-x-6">
                        <img src={data.pic} className="rounded-full blur-[3px]"/>
                        <div className="flex flex-row space-x-3">
                            <div className="flex flex-col justify-evenly">
                                <p> Pos: </p>
                                <p> Team: </p>
                                <p> Age: </p>
                            </div>
                            <div className="flex flex-col justify-evenly blur-[3px]">
                                <p> {data.pos} </p>
                                <p> {data.team} </p>
                                <p> {data.age} </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg text-center">
                            2022-2023 Season Stats
                        </h1>
                        <div className="container grid grid-cols-9 gap-1 text-xs brk:text-xs">
                            <p> MPG </p>
                            <p> PPG </p>
                            <p> REB </p>
                            <p> AST </p>
                            <p> STL </p>
                            <p> BLK </p>
                            <p> TOV </p>
                            <p> FG% </p>
                            <p> 3P% </p>
                            <p className="blur-[3px]"> {data.min} </p>
                            <p className="blur-[3px]"> {data.ppg} </p>
                            <p className="blur-[3px]"> {data.reb} </p>
                            <p className="blur-[3px]"> {data.ast} </p>
                            <p className="blur-[3px]"> {data.stl} </p>
                            <p className="blur-[3px]"> {data.blk} </p>
                            <p className="blur-[3px]"> {data.tov} </p>
                            <p className="blur-[3px]"> {(data.fg*100).toFixed(1)} </p>
                            <p className="blur-[3px]"> {(data.thr*100).toFixed(1)} </p>
                        </div>
                        <div>
                            <Overall category="Overall" overall={overallRTG} />
                            <Overall category="Offense" overall={offenseRTG} />
                            <Overall category="Defense" overall={defenseRTG} />
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </button>
  )
}