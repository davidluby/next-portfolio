import React from 'react'
import Card from "@components/decks/Card"
import ExpandCards from "@components/decks/ExpandCards"
import Remove from "@components/decks/Remove"

const zoomCard = (idx) => {
    const zoom = document.querySelector("#zoomCard-"+idx);
    if (zoom != null) {
        zoom.classList.toggle("z-50");
        zoom.classList.toggle("scale-[.65]");
        zoom.classList.toggle("scale-85");
        zoom.classList.toggle("hover:bottom-2")
    };
};

export default function Deck({ cards, setCards }) {
  return (
    <div className="flex flex-col">
        <div className="flex flex-row justify-center -space-x-72 border-4 border-red-500"
            id="expand">
                {cards.map(function(item, idx) {
                    return <div className="relative scale-[.65] bottom-0 hover:bottom-2 transition-all ease-in duration-300"
                                id={"zoomCard-"+idx}
                                key={idx}>
                                <div key={idx}
                                    onClick={() => zoomCard(idx)}>
                                    <Card data={item} loc={'a'+idx} />
                                </div>
                                <Remove cards={cards} setCards={setCards} loc={idx} />
                            </div>
                        })
                }
        </div>
        <ExpandCards />
    </div>
  )
}