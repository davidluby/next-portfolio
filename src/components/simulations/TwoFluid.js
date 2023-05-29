import React, { useEffect } from 'react';
import Link from 'next/link'

export default function TwoFluid({ name }) {
    let scene = {
        width : 600,
        height : 300,
        gravity : -9.8,
        dT : .10,
        gauss_seidel_iters : 20,
        overrelaxation : 1.9,
        divs : 25,
    };

    function draw(gl) {
    };


    useEffect(() => {
        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");
        canvas.width = scene.width;
        canvas.height = scene.height;
        
        draw(gl);
    }, [])
    
    return (
        <div className="w-full tile bg-slate-900">
            <h1>
                <Link href="/fluids" className="hover:text-yellow-500 transition-all duration-300 ease-in">
                    WebGL Fluid Simulation -- <i>coming soon</i>
                </Link>
            </h1>
            <div className="flex flex-col">
                <canvas id={name} className="w-full mb-2 border-2 rounded-xl border-yellow-500"></canvas>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <button className="rounded-md p-1 bg-slate-800 hover:bg-slate-900 text-xs text-white" onClick={() => restart()}>Restart</button>
                    <button className="rounded-md p-1 bg-slate-800 hover:bg-slate-900 text-xs text-white" onClick={() => toggleGravity()}>Toggle Gravity</button>
                    <div className="flex flex-col items-center">
                        <p className="text-xs">Slider</p>
                        <input id="fluid" type="range" min="0.1" max="1" step="0.1" defaultValue="1" className="h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer range-sm"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}