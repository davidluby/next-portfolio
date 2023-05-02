import React, { useEffect } from 'react';

export default function TwoFluid({ name }) {

    useEffect(() => {
    }, [])
    
    return (
        <div className="w-[97%] res:w-3/4 tile bg-slate-900">
            <h1>
                2-D Fluid Simulation
            </h1>
            <div className="flex flex-col">
                <canvas id={name} className="w-full mb-2 border-2 rounded-xl border-yellow-500"></canvas>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <button className="rounded-md p-1 bg-slate-800 hover:bg-slate-700 text-sm text-white" >Button</button>
                    <button className="rounded-md p-1 bg-slate-800 hover:bg-slate-700 text-sm text-white" >Button</button>
                    <div className="flex flex-col items-center">
                        <p className="text-sm">Slider</p>
                        <input id="fluid" type="range" min="0.1" max="1" step="0.1" defaultValue="1" className="h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}