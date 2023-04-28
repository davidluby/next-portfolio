import React, { useEffect } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export default function ThreeProjectile() {
    useEffect(() => {

        
    })
    
    return (
        <div className="w-full res:w-[49%] p-5 my-5 res:my-0 res:p-12 shadow-lg rounded-xl ring-1 ring-black/5">
            <h1>
                3-D Projectile Simulation
            </h1>
            <div id="container"></div>
        </div>
    )
}