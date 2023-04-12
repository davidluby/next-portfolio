import React from 'react'

export default function Add({ playerData, cards, setCards, setEmpty }) {
    const [full, setFull] = useState(false);
    const add = () => {
        if (cards.length < 5) {
            setCards([...cards, playerData]);
            setEmpty(false);
            setFull(false);
        } else{
            setFull(true);
        }
    };
  return (
    <button className="w-max py-2 px-3 rounded-full bg-green-700 hover:bg-green-600 text-white font-bold transition all duration-500"
            onClick={add}
            disabled={full}>
        Add card to Deck
    </button>
  )
}