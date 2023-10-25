import React from 'react'
import Overall from "@components/decks/Overall"

export default function CurrentCard({ cardData, loc }) {
    const offenseRTG = ((cardData.ppg/28)*0.6 + (cardData.reb/9)*0.1 + (cardData.ast/9)*0.3);
    const defenseRTG = ((cardData.reb/13)*0.05 + (cardData.stl/1.2)*0.475 + (cardData.blk/1)*0.475);
    const overallRTG = ((cardData.min/40)*0.2 + +offenseRTG*0.6 + defenseRTG*0.2);

    function flipCard() {
        const id = "#flipState-"+loc
        const flip = document.querySelector(id)
        flip.classList.toggle("[transform:rotateY(180deg)]")
    }
  return (
    <button className="group text-left card-size transition-all ease-in duration-500 [perspective:1000px]">
        <div className="relative h-full w-full transition-all ease-in duration-500 [transform-style:preserve-3d]"
            id={"flipState-"+loc}
            onClick={() => flipCard()}>


            <div className="absolute h-full w-full rounded-xl shadow-sm shadow-black/80 bg-center bg-cover bg-no-repeat [backface-visibility:hidden]"
                style={{backgroundImage: `url(${"./fullstack/cities/" + cardData.team.toLowerCase() + ".jpg"})`}}>
            </div>
            <div className="absolute overflow-hidden h-full w-full rounded-xl border-4 border-yellow-500 group-hover:border-yellow-300 [backface-visibility:hidden] transition-all duration-500">
                <div className="absolute w-[32rem] top-52 rotate-90 pl-12 text-xl font-bold italic bg-yellow-500 group-hover:bg-yellow-300 transition-all duration-500">
                    {cardData.team} - {cardData.name}
                </div>
            </div>


            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="absolute h-full w-full rounded-xl shadow-sm shadow-black/80 bg-center bg-cover bg-no-repeat [transform:rotateY(180deg)]"
                    style={{backgroundImage: `url(${"./fullstack/cities/" + cardData.team.toLowerCase() + ".jpg"})`}}>
                    <div className="flex flex-col items-center justify-evenly h-full w-full rounded-xl bg-black/60 [transform:rotateY(180deg)]">
                        <div className="flex flex-row space-x-6">
                            <img src={cardData.pic} className="rounded-full blur-[3px]"/>
                            <div className="flex flex-row space-x-3">
                                <div className="flex flex-col justify-evenly">
                                    <p> Pos: </p>
                                    <p> Team: </p>
                                    <p> Age: </p>
                                </div>
                                <div className="flex flex-col justify-evenly blur-[3px]">
                                    <p> {cardData.pos} </p>
                                    <p> {cardData.team} </p>
                                    <p> {cardData.age} </p>
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
                                <p className="blur-[3px]"> {cardData.min} </p>
                                <p className="blur-[3px]"> {cardData.ppg} </p>
                                <p className="blur-[3px]"> {cardData.reb} </p>
                                <p className="blur-[3px]"> {cardData.ast} </p>
                                <p className="blur-[3px]"> {cardData.stl} </p>
                                <p className="blur-[3px]"> {cardData.blk} </p>
                                <p className="blur-[3px]"> {cardData.tov} </p>
                                <p className="blur-[3px]"> {(cardData.fg*100).toFixed(1)} </p>
                                <p className="blur-[3px]"> {(cardData.thr*100).toFixed(1)} </p>
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
        </div>  
    </button>
  )
}