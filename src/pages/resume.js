import React, { useState } from 'react'
import Slideshow from "@components/Slideshow"

export default function Resume(){

const slides = [
    ["Data structures and algorithms", "Fullstack web development", "C, Python, Javascript, SQL, HTML, CSS, MATLAB"],
    ["Mechatronic system modeling (DC and stepper motors, IR, Hall Effect, and color sensors)", "Microprocessor programming and component interfacing (datasheets)", "C, Python, MATLAB, Atmel Microchip Studio"],
    ["Version-controlled product development (SOLIDWORKS PDM)", "Control system, finite element, and statistical analysis", "MATLAB, SIMULINK, SOLIDWORKS, Excel, JMP"],
    ["AWS, EC2, Apache, WSGI, Flask, CI/CD", "Windows, Linux, Git, GitHub"],
];

const changeSlide = (num) => {
    const discipline = document.querySelector("#changeSlide-"+num)
    discipline.classList.toggle("hidden")
}

    return (
        <div className="flex flex-row justify-evenly items-center border-4 border-blue-400">
            <div className="relative flex items-center h-28 [width:40rem] shadow-lg rounded-xl ring-1 ring-black/5">
                <img className=" absolute w-40 h-40 rounded-full -left-6 shadow-lg" src="headshot.jpg"></img>
                <div className="pl-40">
                    <h1>
                        David Luby
                    </h1>
                    <p>
                        BS, Mechanical Engineering, University of New Hampshire - 2022
                    </p>
                    <ul className="flex flex-row items-center space-x-0">
                        <li className ="w-7 h-7">
                            <a href="https://linkedin.com/in/david-luby/" className="logo-linked w-7 h-7 inline-block bg-center bg-no-repeat" target="_blank" rel="noopener noreferrer"></a>
                        </li>
                        <li className="w-7 h-7">
                        <a href="https://github.com/davidluby" className="logo-github w-7 h-7 inline-block bg-center bg-no-repeat rounded-full" target="_blank" rel="noopener noreferrer"></a>
                        </li>
                        <li>
                            <p className=""> &#160;davidluby273@gmail.com</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col justify-center px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
                <h1 className="pb-2">
                    Technical Skills
                </h1>
                <ul className="flex space-x-2 border-b-2 mb-2">
                    <li>
                        <a href="" className="p-2 inline-block rounded-t-lg hover:bg-gray-200"
                            onClick={() => changeSlide(0)}>Software</a>
                    </li>
                    <li>
                        <a href="" className="p-2 inline-block rounded-t-lg hover:bg-gray-200"
                            onClick={() => changeSlide(1)}>Firmware</a>
                    </li>
                    <li>
                        <a href="" className="p-2 inline-block rounded-t-lg hover:bg-gray-200"
                            onClick={() => changeSlide(2)}>Mechanical</a>
                    </li>
                    <li>
                        <a href="" className="p-2 inline-block rounded-t-lg hover:bg-gray-200"
                            onClick={() => changeSlide(3)}>DevOps</a>
                    </li>
                </ul>
                {slides.map(function(slide, idx) {
                    return <div className="hidden"
                                id={"changeSlide-"+idx}
                                key={idx}>
                                    {slide.map(function(line, jdx) {
                                        return <p key={jdx}>{line}</p>
                                        })
                                    }
                            </div>
                        })
                    }
            </div>
        </div>
    )
}