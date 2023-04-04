import React from 'react'

function Overall({category, overall}) {
  let rating
  if (overall*100 > 100) {
    rating = "100%";
  } else {
    rating = (overall*100).toString() + "%";
  }

  return (
    <div className="text-xs dark:text-white">
      {category}
      <div className="mt-1 w-full h-1.5 rounded-full bg-slate-700">
        <div className="h-full bg-green-500 rounded-full"
          style={{ width: rating }}>
          </div>
      </div>
    </div>
  )
}

export default Overall