import React, { useState } from 'react'

export default function Slides({names, pictures}) {
    const [index, setIndex] = useState(0);

    function clickIdx(id) {
        setIndex(id);
    }

  return (
    <div className="flex flex-col w-[97%] res:w-2/3 items-center -mt-2 mb-20">
        <div className="flex flex-wrap justify-left w-full mb-5 border-b-4 border-yellow-500">
            {names.map(function(name, id) {
                return <button key={id} className="bg-slate-700 rounded-t-[4px] nav-button mr-2 mt-2" onClick={() => clickIdx(id)}>
                    <h2><b>{name}</b></h2>
                </button>
            })}
        </div>
        <div className="flex flex-col w-full tile">
            {pictures[index].map(function(picture, jd) {
                return <img key={jd} src={picture}></img>
            })}
        </div>
    </div>
  )
}