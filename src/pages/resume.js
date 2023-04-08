import React, { useState } from 'react'

export default function Resume(){

const slides = [
    ["Data structures and algorithms", "Fullstack web development", ["c.png", "python.png", "matlab.png", "js.png", "sql.png", "html.png", "css.png", "tw.png", "react.png", "next.png", "flask.png", "git.png"]],
    ["Mechatronic system modeling (DC and stepper motors, IR, Hall Effect, and color sensors)", "Microprocessor programming and component interfacing (datasheets)", ["c.png", "python.png", "matlab.png", "atmel.png", "arduino.png"]],
    ["Version-controlled product development (SOLIDWORKS PDM)", "Control system, finite element, and statistical analysis", "MATLAB, SIMULINK, SOLIDWORKS, Excel, JMP",["matlab.png", "simulink.png", "sw.png", "pdm.png", "excel.png", "jmp.png"] ],
    ["AWS, EC2, Apache, WSGI, Flask, CI/CD", "Windows, Linux, Git, GitHub", ["aws.png", "apache.png", "mssql.png", "bash.png","ps.png","cmd.png","linux.png"]],
];

const [slide, setSlide] = useState(slides[0]);
const [index, setIndex] = useState(0);

const changeSlide = (num) => {
    setSlide(slides[num])
    var tab = document.querySelector("#tog"+index)
    tab.classList.toggle("bg-gray-200")
    const tab2 = document.querySelector("#tog"+num)
    tab2.classList.toggle("bg-gray-200")
    setIndex(num)

}

    return (
        <div className="flex flex-row justify-evenly items-center">
            <div className="relative flex items-center h-36 w-[35rem] shadow-lg rounded-xl ring-1 ring-black/5">
                <img className=" absolute w-48 h-48 rounded-full -left-6 shadow-lg" src="headshot.jpg"></img>
                <div className="pl-52">
                    <h1>
                        <b>David Luby</b>
                    </h1>
                    <p>
                        <i>BS, Mechanical Engineering</i>
                    </p>
                    <p>
                        University of New Hampshire 2022
                    </p>
                    <ul className="flex flex-row justify-center space-x-2">
                        <li className ="w-7 h-7">
                            <a href="https://linkedin.com/in/david-luby/" className="logo-linked w-7 h-7 inline-block bg-center bg-no-repeat" target="_blank" rel="noopener noreferrer"></a>
                        </li>
                        <p><b>|</b></p>
                        <li className="w-7 h-7">
                            <a href="https://github.com/davidluby" className="logo-github w-7 h-7 inline-block bg-center bg-no-repeat rounded-full" target="_blank" rel="noopener noreferrer"></a>
                        </li>
                        <p><b>|</b></p>
                        <li>
                            <p>davidluby273@gmail.com</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col w-[35rem] h-[23rem] px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
                <h1 className="pb-2">
                    <b>Technical Skills</b>
                </h1>
                <ul className="flex space-x-2 border-b-2 mb-2">
                    <li>
                        <button className="py-3 px-3 inline-block rounded-t-lg bg-gray-200 hover:bg-gray-200"
                            onClick={() => changeSlide(0)}
                            id="tog0">Software</button>
                    </li>
                    <li>
                        <button className="py-3 px-3 inline-block rounded-t-lg hover:bg-gray-200"
                            onClick={() => changeSlide(1)}
                            id="tog1">Firmware</button>
                    </li>
                    <li>
                        <button className="py-3 px-3 inline-block rounded-t-lg hover:bg-gray-200"
                            onClick={() => changeSlide(2)}
                            id="tog2">Mechanical</button>
                    </li>
                    <li>
                        <button className="py-3 px-3 inline-block rounded-t-lg hover:bg-gray-200"
                            onClick={() => changeSlide(3)}
                            id="tog3">DevOps</button>
                    </li>
                </ul>
                <ul className="flex flex-col list-disc list-inside">
                {slide.map(function(content,idx) {
                    if (idx != slide.length-1) {
                        return <li key={idx}>
                            {content}
                            </li>
                    } else {
                        return <div key={idx} className="flex flex-wrap justify-center mt-5 space-x-2">
                            {content.map(function(pic, jdx) {
                            return <img key={jdx} src={"/resume/"+pic} className="h-12 w-auto"></img>
                        })}
                        </div>
                    }
                })}
                </ul>
            </div>
        </div>
    )
}