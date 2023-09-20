import React, { useState } from 'react'

function PDF({names, files}) {
    const [index, setIndex] = useState(0);

    function clickIdx(id) {
        setIndex(id)
    }
  return (
    <div className="w-[97%] res:w-2/3">
        <div className="flex flex-wrap justify-left w-full mb-5 border-b-4 border-yellow-500">
            {names.map(function(name, id) {
                return <button key={id} className="rounded-t-[4px] rounded-b-0 nav-button mr-2 mt-2 bg-[#333336]/[.125]" onClick={() => clickIdx(id)}>
                    <h2><b>{name}</b></h2>
                    </button>
            })}
        </div>
        <embed src={files[index]} className="tile" width="100%" height="800px"/>
    </div>
  )
}

export default PDF