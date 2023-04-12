import React, { useState } from 'react'

export default function Resume(){

const slides = [
    ["Data structures and algorithms", "Fullstack web development", ["c.png", "python.png", "matlab.png", "js.png", "sql.png", "html.png", "css.png", "tw.png", "react.png", "next.png", "flask.png", "git.png"]],
    ["Mechatronic system modeling (DC and stepper motors, IR, Hall Effect, and color sensors)", "Microprocessor programming and component interfacing (datasheets)", ["c.png", "python.png", "matlab.png", "atmel.png", "arduino.png"]],
    ["Version-controlled product development (SOLIDWORKS PDM)", "Control system, finite element, and statistical analysis", "MATLAB, SIMULINK, SOLIDWORKS, Excel, JMP",["matlab.png", "simulink.png", "sw.png", "pdm.png", "excel.png", "jmp.png"] ],
    ["AWS, EC2, Apache, WSGI, Flask, CI/CD", "Windows, Linux, Git, GitHub", ["aws.png", "ec2.png", "apache.png", "mssql.png", "bash.png","ps.png","cmd.png","linux.png"]],
];

const [slide, setSlide] = useState(slides[0]);
const [index, setIndex] = useState(0);

const changeSlide = (num) => {
    setSlide(slides[num])
    var tab = document.querySelector("#tog"+index)
    tab.classList.toggle("bg-[#007A33;]")
    const tab2 = document.querySelector("#tog"+num)
    tab2.classList.toggle("bg-[#007A33;]")
    setIndex(num)

}

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-evenly items-center">
                <div className="relative flex items-center h-36 w-[35rem] shadow-lg rounded-xl ring-1 ring-black/5">
                    <img className=" absolute w-48 h-48 rounded-full -left-6 shadow-lg" src="headshot.jpg"></img>
                    <div className="pl-52">
                        <h1>
                            David Luby
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
                        <b><i>Technical Skills</i></b>
                    </h1>
                    <ul className="flex flex-row space-x-2 mb-2 border-b-[.25rem] border-[#BA9653;]">
                        <li>
                            <button className="py-3 px-3 inline-block rounded-t-lg bg-[#007A33;] hover:bg-[#007A33;]"
                                onClick={() => changeSlide(0)}
                                id="tog0">Software</button>
                        </li>
                        <li>
                            <button className="py-3 px-3 inline-block rounded-t-lg hover:bg-[#007A33;]"
                                onClick={() => changeSlide(1)}
                                id="tog1">Firmware</button>
                        </li>
                        <li>
                            <button className="py-3 px-3 inline-block rounded-t-lg hover:bg-[#007A33;]"
                                onClick={() => changeSlide(2)}
                                id="tog2">Mechanical</button>
                        </li>
                        <li>
                            <button className="py-3 px-3 inline-block rounded-t-lg hover:bg-[#007A33;]"
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
            <div className="mt-20 px-20">
                <div className="px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
                    <h1>
                        <b><i>Work Experience</i></b>
                    </h1>
                    <div className="flex flex-row justify-between">
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
                    <div className="flex flex-row justify-between mt-10">
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
                    <div className="flex flex-row justify-between mt-10">
                        <h2>MATLAB Grader - Durham, NH</h2>
                        <h2>Sep 2021 - Dec 2021</h2>
                    </div>
                    <p><i>Assignment Grader</i></p>
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
            </div>
            <div className="mt-20 px-20">
                <div className="px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
                    <h1>
                        <b><i>Education</i></b>
                    </h1>
                    <div className="flex flex-row justify-between">
                        <h2>Bachelor of Science: Mechanical Engineering</h2>
                        <h2>Aug 2018 - Dec 2022</h2>
                    </div>
                    <div className="flex flex-row justify-between">
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
                <div className="px-12 py-4 my-20 items-center shadow-lg rounded-xl ring-1 ring-black/5">
                    <h1>
                        <b><i>Certifications</i></b>
                    </h1>
                    <ul className="list-disc list-inside">
                        <li>
                            Security Clearance
                        </li>
                        <li>
                            Class B Commercial Driver&#39;s License
                        </li>
                        <li>
                            Medical Examiner&#39;s Certificate
                        </li>   
                    </ul>
                </div>
            </div>
        </div>
    )
}