import React, { useState, useEffect } from 'react'

export default function Resume(){

    const slides = [
        ["Data structures and algorithms", "Fullstack web development", ["c.png", "python.png", "matlab.png", "js.png", "sql.png", "html.png", "css.png", "tw.png", "react.png", "next.png", "flask.png", "git.png"]],
        ["Mechatronic system modeling (DC and stepper motors, IR, Hall Effect, and color sensors)", "Microprocessor programming and component interfacing (datasheets)", ["c.png", "python.png", "matlab.png", "atmel.png", "arduino.png"]],
        ["Version-controlled product development (SOLIDWORKS PDM)", "Control system, finite element, and statistical analysis", "MATLAB, SIMULINK, SOLIDWORKS, Excel, JMP",["matlab.png", "simulink.png", "sw.png", "pdm.png", "excel.png", "jmp.png"] ],
        ["AWS, EC2, Apache, WSGI, Flask, CI/CD", "Windows, Linux, Git, GitHub", ["aws.png", "ec2.png", "apache.png", "mssql.png", "bash.png","ps.png","cmd.png","linux.png", "win.png"]],
    ];

    const names = ['Software', 'Firmware', 'Mechanical', 'DevOps'];

    const [slide, setSlide] = useState(slides[0]);
    const [index, setIndex] = useState(0);

    const addIDX = () => {
        if (index < 3) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }
    const subtractIDX = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(3);
        }
    }

    useEffect(() => {
        setSlide(slides[index]);
    }, [index])

    return (
        <div className="flex flex-col items-center mb-20">
            <div className="flex flex-col res:flex-row res:items-center res:justify-evenly w-[97%] res:w-5/6">
                <div className="res:relative flex flex-col items-center justify-center res:items-end res:w-[26rem] res:h-[8rem] px-3 py-5 shadow-lg rounded-xl ring-1 ring-black/5 text-center res:text-left">
                    <img className="res:absolute res:-left-12 w-60 res:w-[12rem] rounded-full shadow-lg" src="headshot.jpg"></img>
                    <div>
                        <ul className="flex flex-row justify-center items-center res:justify-start mt-2 res:mt-0 space-x-2">
                            <h2>
                                David Luby
                            </h2>
                            <p><b>|</b></p>
                            <li className ="w-7 h-7">
                                <a href="https://linkedin.com/in/david-luby/" className="logo-linked w-7 h-7 inline-block bg-center bg-no-repeat" target="_blank" rel="noopener noreferrer"></a>
                            </li>
                            <p><b>|</b></p>
                            <li className="w-7 h-7">
                                <a href="https://github.com/davidluby" className="logo-github w-7 h-7 inline-block bg-center bg-no-repeat rounded-full" target="_blank" rel="noopener noreferrer"></a>
                            </li>
                        </ul>
                        <p>
                            <i>BS, Mechanical Engineering</i>
                        </p>
                        <p>
                            University of New Hampshire 2022
                        </p>
                    </div>
                </div>
                <div className="flex flex-col res:w-2/5 p-5 res:p-12 mt-20 res:mt-0 shadow-lg rounded-xl ring-1 ring-black/5">
                    <h1 className="pb-2 text-center">
                        <b><i>Technical Skills</i></b>
                    </h1>
                    <div className="flex flex-row justify-evenly w-full my-5">
                        <button onClick={() => subtractIDX()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <h2 className="w-1/2 text-center">
                            {names[index]}
                        </h2>
                        <button onClick={() => addIDX()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
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
            <div className="w-[97%] res:w-5/6 p-5 res:p-12 mt-20 shadow-lg rounded-xl ring-1 ring-black/5">
                <h1>
                    <b><i>Work Experience</i></b>
                </h1>
                <div className="flex flex-col res:flex-row res:justify-between">
                    <h2>Lake Shore Cryotronics - Woburn, MA</h2>
                    <h2>May 2022 - Aug 2022</h2>
                </div>
                <p><i>Mechanical Engineering Intern</i></p>
                <ul className="list-disc list-inside">
                    <li>
                        Analyzed ST-500 cryostat tolerance stack up (TSU) and initiated an engineering change order for an approximate
                        67% reduction (~1 mm) in the worst-case TSU without threat to product budget.
                    </li>
                    <li>
                        Engaged in research and development of a collet-style adjustable sample holder with cooling capacity effective to 
                        approximately 4 Kelvin to linearize manufacturing through a more versatile product.
                    </li>
                    <li>
                        Applied complete cyclic engineering method in new product development and sustaining engineering, interfacing 
                        with SOLIDWORKS PDM for company coordination.
                    </li>   
                </ul>
                <div className="flex flex-col res:flex-row res:justify-between mt-10">
                    <h2>Federal Aviation Administration - Washington, DC</h2>
                    <h2>June 2021 - Aug 2021</h2>
                </div>
                <p><i>Systems Engineering Intern</i></p>
                <ul className="list-disc list-inside">
                    <li>
                        Established an Inherent Availability requirement at the three 9&#39;s threshold (99.9% availability) for Non-Federal 
                        Remote Airport Traffic Control Towers (ATCT) to ensure adherence to safety and performance standards within 
                        the National Airspace System (NAS).
                    </li>
                    <li>
                        Substantiated Federal authority to enforce an availability requirement for Non-Federal Remote Tower (RT) 
                        systems using existing domestic and foreign documents detailing Non-Federal RT system association to the NAS.
                    </li>
                    <li>
                        Amended RT Systems Minimum Functional and Performance Requirements for Non-Federal Applications
                        document to reflect updated Non-Federal Remote ATCT system RMA requirements.
                    </li>   
                </ul>
                <div className="flex flex-col res:flex-row res:justify-between mt-10">
                    <h2>University of New Hampshire - Durham, NH</h2>
                    <h2>Sep 2021 - Dec 2021</h2>
                </div>
                <p><i>MATLAB Grader</i></p>
                <ul className="list-disc list-inside">
                    <li>
                        Interpreted students&#39; unique script architectures to assist in debugging and provide constructive feedback to 
                        promote growth and enhance learning.
                    </li>
                    <li>
                        Developed appreciation for producing personally and externally comprehensible work for effective collaboration.
                    </li>   
                </ul>
            </div>
            <div className="w-[97%] res:w-5/6 p-5 res:p-12 mt-20 shadow-lg rounded-xl ring-1 ring-black/5">
                <h1>
                    <b><i>Education</i></b>
                </h1>
                <div className="flex flex-col res:flex-row res:justify-between">
                    <h2>Bachelor of Science: Mechanical Engineering</h2>
                    <h2>Aug 2018 - Dec 2022</h2>
                </div>
                <div className="flex flex-col res:flex-row res:justify-between">
                    <p><i>University of New Hampshire</i></p>
                    <p>GPA: 3.1</p>
                </div>
                <ul className="list-disc list-inside">
                    <li>
                        Intramurals: Flag Football, Softball, Soccer
                    </li>
                    <li>
                        Dean&#39;s List
                    </li>   
                </ul>
            </div>
            <div className="w-[97%] res:w-5/6 p-5 res:p-12 mt-20 shadow-lg rounded-xl ring-1 ring-black/5">
                <h1>
                    <b><i>Certifications</i></b>
                </h1>
                <ul className="list-disc list-inside">
                    <li>
                        Previous Security Clearance
                    </li>
                    <li>
                        Class B Commercial Driver&#39;s License
                    </li>
                    <li>
                        Active DOT physical
                    </li>   
                </ul>
            </div>
        </div>
    )
}