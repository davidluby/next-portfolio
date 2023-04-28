import React from 'react';
import Canvas from "@src/components/simulations/Canvas"

export default function Simulator() {
    return (
        <div className="flex justify-center w-full mt-20">
            <Canvas name={"fluidCanvas"} />
        </div>
    )
}