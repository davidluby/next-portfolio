import React from 'react'

export default function Slideshow({ slides }) {

  return (
    <div>
      {slides.map(function(slide, idx) {
        return <div className="hidden" key={idx}>
          {slide.map(function(line, jdx) {
            return <p key={jdx}>{line}</p>
          })}
        </div>
      })
      }
    </div>
  )
}