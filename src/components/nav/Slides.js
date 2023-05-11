import React, { useState } from 'react'

export default function Slides({names, pictures}) {
    const [index, setIndex] = useState(0);

    function clickIdx(id) {
        setIndex(id);
    }

  return (
    <div className="flex flex-col w-[97%] res:w-5/6 items-center -mt-2 res:mt-0">
        <div className="flex flex-wrap justify-left w-1/2 mb-5 border-b-4 border-yellow-500">
            {names.map(function(name, id) {
                return <button key={id} className="bg-slate-900 rounded-t-[4px] nav-button mr-2 mt-2 res:mt-0" onClick={() => clickIdx(id)}>
                    <h2><b>{name}</b></h2>
                </button>
            })}
        </div>
        <div className="flex flex-col res:w-1/2 tile bg-slate-900">
            {pictures[index].map(function(picture, jd) {
                return <img key={jd} src={picture}></img>
            })}
        </div>
    </div>
  )
}