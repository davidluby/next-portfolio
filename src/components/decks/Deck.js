import React from 'react'
import Card from "@components/decks/Card"
import Remove from "@components/decks/Remove"

const zoomCard = (idx) => {
    const zoom = document.querySelector("#zoomCard-"+idx);
    if (zoom != null) {
        zoom.classList.toggle("z-50");
        zoom.classList.toggle("scale-75");
        zoom.classList.toggle("scale-[.85]");
        zoom.classList.toggle("app:scale-100");
        zoom.classList.toggle("hover:bottom-2")
    };
};

export default function Deck({ cards, setCards }) {
  return (
    <div className="flex flex-col">
        <div className="flex flex-row justify-center -space-x-[20rem] app:-space-x-[21.5rem]"
            id="expand">
                {cards.map(function(item, idx) {
                    return <div className="relative scale-75 bottom-0 hover:bottom-2 transition-all ease-in duration-300"
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
    </div>
  )
}