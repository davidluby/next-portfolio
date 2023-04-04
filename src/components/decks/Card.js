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
                <div className="flex flex-col items-center justify-evenly h-full w-full p-4 rounded-xl bg-black/60 text-white">
                    <div className="flex flex-row space-x-6">
                        <img src={data.pic} className="rounded-full"/>
                        <div className="flex flex-row space-x-3">
                            <div className="flex flex-col justify-evenly">
                                <p> Age: </p>
                                <p> Team: </p>
                                <p> Pos: </p>
                            </div>
                            <div className="flex flex-col justify-evenly">
                                <p> {data.age} </p>
                                <p> {data.team} </p>
                                <p> {data.pos} </p>
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
                            <p className=""> {data.min} </p>
                            <p className=""> {data.ppg} </p>
                            <p className=""> {data.reb} </p>
                            <p className=""> {data.ast} </p>
                            <p className=""> {data.stl} </p>
                            <p className=""> {data.blk} </p>
                            <p className=""> {data.tov} </p>
                            <p className=""> {(data.fg*100).toFixed(1)} </p>
                            <p className=""> {(data.thr*100).toFixed(1)} </p>
                        </div>
                        <div>
                            <Overall category="Overall" overall={overallRTG} />
                            <Overall category="Offense" overall={offenseRTG} />
                            <Overall category="Defense" overall={defenseRTG} />
                        </div>
                    </div>
                    <p className="text-xs text-center">All player statistics, pictures, and data taken from <a className="underline text-blue-700 hover:text-blue-400"
                            href="https://www.basketball-reference.com"
                            target="_blank"
                            rel="noopener noreferrer">www.basketball-reference.com</a>. This demonstration is intentionally limited to respect the <a className="underline text-blue-700 hover:text-blue-400"
                                href="https://www.sports-reference.com/data_use.html"
                                target="_blank"
                                rel="noopener noreferrer">guidlines</a> issued by Sports Reference.
                    </p>
                </div>
            </div>
        </div>  
    </button>
  )
}